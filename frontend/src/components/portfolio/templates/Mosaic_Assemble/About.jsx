import React from 'react';
import { motion } from 'framer-motion';
import MosaicImage from './MosaicImage';
import { ScatterItem } from './ScatterText';

const About = ({ data = {} }) => (
  <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
    <motion.div
      className="w-full md:w-1/3"
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      <MosaicImage
        src={data.avatar}
        alt="Profile"
        rows={4}
        cols={4}
        className="aspect-square rounded-full md:rounded-2xl"
      />
    </motion.div>

    <div className="w-full md:w-2/3">
      <ScatterItem>
        <h2 className="text-4xl font-bold mb-6 text-white">About Me</h2>
      </ScatterItem>

      <ScatterItem delay={0.18}>
        <p className="text-lg text-slate-300 leading-relaxed mb-6">{data.bio}</p>
      </ScatterItem>

      <ScatterItem delay={0.35}>
        <motion.div
          className="inline-flex items-center px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-cyan-300"
          whileHover={{
            borderColor: 'rgba(34,211,238,0.8)',
            backgroundColor: 'rgba(6,182,212,0.08)',
            y: -2,
            transition: { duration: 0.2 },
          }}
        >
          <motion.span
            className="w-2 h-2 bg-cyan-400 rounded-full mr-3"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          Based in {data.location}
        </motion.div>
      </ScatterItem>
    </div>
  </section>
);

export default About;