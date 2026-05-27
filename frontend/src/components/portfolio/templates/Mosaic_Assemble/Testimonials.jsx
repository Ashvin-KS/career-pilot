import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ testimonials = [] }) => {
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const headingWidth = useMemo(() => Math.max(300, Math.min(620, viewportWidth - 56)), [viewportWidth]);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto bg-slate-900/20 rounded-3xl my-24">
      <div className="mb-12 flex justify-center">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: `${headingWidth}px` }}
        >
          Words from Others
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '900px' }}>
        {testimonials.map((t, i) => {
          const fromLeft = i % 2 === 0;
          return (
            <motion.div
              key={t?.id || `${t?.name || 'testimonial'}-${i}`}
              initial={{
                opacity: 0,
                rotateY: fromLeft ? 25 : -25,
                x: fromLeft ? -40 : 40,
                y: 30,
                scale: 0.9,
              }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 16,
                delay: i * 0.14,
              }}
              whileHover={{
                y: -6,
                rotateY: fromLeft ? 2 : -2,
                transition: { type: 'spring', stiffness: 300, damping: 22 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="p-8 bg-slate-900 border border-slate-800 rounded-2xl h-full flex flex-col justify-between hover:border-cyan-400/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10 transition-colors duration-300 cursor-default"
            >
              <span className="text-6xl leading-none text-cyan-500/30 font-serif block mb-2 select-none">"</span>
              <p className="text-slate-300 italic mb-8 text-lg">{t.text}"</p>

              <div className="flex items-center gap-4">
                {t.avatar ? (
                  <motion.img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-300 font-bold">
                    {t.name?.charAt(0) || '?'}
                  </div>
                )}
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-slate-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;