import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experience = [] }) => {
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const headingWidth = useMemo(() => Math.max(240, Math.min(420, viewportWidth - 80)), [viewportWidth]);

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto border-t border-slate-900">
      <div className="mb-16 flex justify-center">
        <motion.h2
          className="text-4xl font-bold text-center text-white"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          whileInView={{ opacity: 1, letterSpacing: '0em' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: `${headingWidth}px` }}
        >
          Journey
        </motion.h2>
      </div>

      <div className="relative">
        {/* Draw Timeline vertical track line downward */}
        <motion.div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-cyan-400/60 to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%' }}
        />

        <div className="space-y-6 pl-6">
          {experience.map((exp, i) => (
            <motion.div
              key={`${exp?.role || 'role'}-${exp?.company || 'company'}-${i}`}
              initial={{ opacity: 0, x: -60, skewX: -2 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 16,
                delay: i * 0.12,
              }}
              whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden group hover:bg-slate-900 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-colors duration-300"
            >
              <motion.div
                className="absolute left-0 top-0 w-1 bg-cyan-400/50 rounded-r group-hover:bg-cyan-400 transition-colors duration-300"
                style={{ height: '100%' }}
              />

              <motion.div
                className="absolute -left-[1.65rem] top-1/2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950"
                style={{ translateY: '-50%' }}
              />

              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <span className="text-cyan-300 font-mono mt-2 md:mt-0">{exp.period}</span>
              </div>
              <h4 className="text-xl text-slate-300 mb-4">{exp.company}</h4>
              <p className="text-slate-400 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;