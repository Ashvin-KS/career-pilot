import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import MosaicImage from './MosaicImage';
import { ExternalLink, Github } from 'lucide-react';

const Projects = ({ projects = [] }) => {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const headingWidth = useMemo(() => Math.max(320, Math.min(760, viewportWidth - 48)), [viewportWidth]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-900">
      <div className="mb-16 flex justify-center">
        <motion.h2
          className="text-5xl font-bold text-center text-white"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          style={{ maxWidth: `${headingWidth}px` }}
        >
          Featured Work
        </motion.h2>
      </div>

      <div className="space-y-32">
        {projects.map((proj, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={`${proj?.title || 'project'}-${idx}`}
              className={`flex flex-col gap-10 items-center ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <motion.div
                className="w-full md:w-3/5 relative"
                initial={{
                  opacity: 0,
                  x: isReversed ? 80 : -80,
                  rotate: isReversed ? 2 : -2,
                }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.05 }}
                whileHover={{ y: -6, scale: 1.008, transition: { type: 'spring', stiffness: 200, damping: 22 } }}
              >
                <MosaicImage
                  src={proj.image}
                  alt={proj.title}
                  rows={6}
                  cols={6}
                  className="aspect-video shadow-2xl shadow-cyan-900/20"
                />
              </motion.div>

              <motion.div
                className="w-full md:w-2/5"
                initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.15 }}
              >
                <h3 className="text-3xl font-bold mb-4 text-white">{proj.title}</h3>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {(proj.techStack || []).map((tech, i) => (
                    <motion.div
                      key={`${proj.title}-${tech}-${i}`}
                      initial={{ opacity: 0, scale: 0.6, rotate: (Math.random() - 0.5) * 14 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 14,
                        delay: 0.2 + i * 0.055,
                      }}
                      whileHover={{ y: -3, scale: 1.08, transition: { type: 'spring', stiffness: 500, damping: 20 } }}
                      className="px-3 py-1 bg-slate-900 text-slate-300 text-sm rounded-md border border-slate-800 hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-colors duration-200 cursor-default"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {proj.liveUrl && (
                    <motion.a
                      href={proj.liveUrl}
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex items-center gap-2 bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-200 shadow-lg shadow-cyan-500/25"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </motion.a>
                  )}
                  {proj.githubUrl && (
                    <motion.a
                      href={proj.githubUrl}
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-200 border border-slate-700"
                    >
                      <Github size={18} />
                      Code
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;