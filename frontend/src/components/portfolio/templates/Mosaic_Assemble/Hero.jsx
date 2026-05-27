import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Hero = ({ data = {}, socials = {} }) => {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nameWidth = useMemo(() => Math.max(320, Math.min(980, viewportWidth - 32)), [viewportWidth]);
  const titleWidth = useMemo(() => Math.max(260, Math.min(760, viewportWidth - 40)), [viewportWidth]);

  const socialLinks = [
    { key: 'github', href: socials.github, label: 'GitHub profile', icon: Github },
    { key: 'linkedin', href: socials.linkedin, label: 'LinkedIn profile', icon: Linkedin },
    { key: 'twitter', href: socials.twitter, label: 'Twitter profile', icon: Twitter },
    { key: 'email', href: socials.email ? `mailto:${socials.email}` : null, label: 'Email', icon: Mail },
  ].filter((s) => s.href);

  return (
    <header className="min-h-screen flex flex-col items-center justify-center relative px-6 z-10">
      <div className="text-center max-w-6xl mx-auto flex flex-col items-center gap-6">

        {/* Name Header */}
        <div style={{ maxWidth: `${nameWidth}px` }} className="w-full mx-auto py-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-center leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-violet-500"
          >
            {data.name}
          </motion.h1>
        </div>

        {/* Subtitle / Title */}
        <div style={{ maxWidth: `${titleWidth}px` }} className="w-full mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
            className="text-xl md:text-3xl font-light tracking-wide text-center text-cyan-400"
          >
            {data.title}
          </motion.p>
        </div>

        {/* Social Connections Link Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
          }}
        >
          {socialLinks.map(({ key, href, label, icon: Icon }) => (
            <motion.a
              key={key}
              href={href}
              aria-label={label}
              variants={{
                hidden: { opacity: 0, scale: 0.4, y: 25 },
                show: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { type: 'spring', stiffness: 220, damping: 20 } 
                },
              }}
              whileHover={{ y: -5, scale: 1.15 }}
              className="p-3 bg-slate-900 text-slate-300 border border-slate-800/60 rounded-lg hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-colors duration-200"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </header>
  );
};

export default Hero;