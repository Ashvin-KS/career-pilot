import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const Skills = ({ skills = [] }) => {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const headingWidth = useMemo(() => {
    const max = 700;
    const pad = 48;
    return Math.max(280, Math.min(max, viewportWidth - pad));
  }, [viewportWidth]);

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12 flex justify-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white tracking-wide"
          style={{ width: `${headingWidth}px` }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Technical Arsenal
        </motion.h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, i) => {
          const name = skill?.name || '';

          return (
            <motion.div
              key={`${skill?.id || skill?.name || 'skill'}-${i}`}
              className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-lg text-slate-300 cursor-default"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
            >
              {name}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;