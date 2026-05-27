
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

/* Magnetic button tracking logic */
const MagneticButton = ({ children, href, disabled, className }) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 22 });
  const y = useSpring(rawY, { stiffness: 200, damping: 22 });

  const handleMove = (e) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * 0.25);
    rawY.set((e.clientY - cy) * 0.25);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  const Tag = disabled ? motion.button : motion.a;

  return (
    <Tag
      ref={ref}
      href={disabled ? undefined : href}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      className={className}
    >
      {children}
    </Tag>
  );
};

const Contact = ({ socials = {} }) => {
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const headingWidth = useMemo(() => Math.max(280, Math.min(620, viewportWidth - 56)), [viewportWidth]);

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto text-center border-t border-slate-900">
      <div className="mb-8 flex justify-center">
        <motion.h2
          className="text-5xl font-black mb-6 text-white flex flex-wrap justify-center gap-x-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: `${headingWidth}px` }}
        >
          Let's Build Something
        </motion.h2>
      </div>

      <motion.p
        className="text-xl text-slate-300 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.4 }}
      >
        <div className="relative inline-flex">
          {socials.email && (
            <motion.span
              className="absolute inset-0 rounded-xl bg-cyan-400/20"
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <MagneticButton
            href={socials.email ? `mailto:${socials.email}` : undefined}
            disabled={!socials.email}
            className={
              socials.email
                ? 'inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-slate-950 rounded-xl font-bold text-lg hover:bg-cyan-400 transition-colors duration-200 shadow-lg shadow-cyan-500/25 relative z-10'
                : 'inline-flex items-center gap-3 px-8 py-4 bg-cyan-500/40 text-slate-950/70 rounded-xl font-bold text-lg cursor-not-allowed opacity-70 relative z-10'
            }
          >
            <Mail />
            Say Hello
            <ArrowRight size={20} />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;