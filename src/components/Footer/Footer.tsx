import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, PenTool } from 'lucide-react';

const Footer: React.FC = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const textHover = {
    hover: { x: 5, color: '#f0abfc', transition: { duration: 0.2 } }, // text-fuchsia-300
  };

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-neutral-950 text-neutral-300 pt-20 pb-10">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Top Section / Header */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 mb-4 leading-normal">
            Alchemy 2026
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-md">
            Chemical Engineering Association, <br />
            Department of Chemical Engineering, <br />
            NIT Trichy.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
            <a href="mailto:chea.nitt.dev@gmail.com" className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
              <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">
                chea.nitt.dev@gmail.com
              </motion.span>
            </a>
            <a href="tel:+918807271377" className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
              <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">
                +91 8807271377
              </motion.span>
            </a>
            <div className="flex items-start gap-3 pt-2">
              <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-neutral-400 leading-relaxed">
                Department of Chemical Engineering,<br />
                NIT Trichy, Thanjavur Road,<br />
                Trichy - 620015.
              </p>
            </div>
          </motion.div>

          {/* Compliance Section */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Compliance</h3>
            {['Terms and Conditions', 'Privacy Policy', 'Refund Policy'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                variants={textHover}
                whileHover="hover"
                className="text-neutral-400 cursor-pointer w-fit"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>

          {/* Socials Section */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Socials</h3>
            <div className="flex flex-col space-y-4">
              <a href="#" className="flex items-center gap-3 group w-fit">
                <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">LinkedIn</motion.span>
              </a>
              <a href="#" className="flex items-center gap-3 group w-fit">
                <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-pink-500 transition-colors" />
                <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">Instagram</motion.span>
              </a>
              <a href="#" className="flex items-center gap-3 group w-fit">
                <PenTool className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">Medium</motion.span>
              </a>
            </div>
          </motion.div>

          {/* Credits Section */}
          <motion.div variants={itemVariants} className="flex flex-col justify-end space-y-2 lg:text-right lg:items-end">
            <p className="text-sm text-neutral-500">Made with 💜 by</p>
            <p className="text-lg font-medium text-white">Khadeer & Antigravity</p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full h-[1px] bg-neutral-800 mb-8" />

        {/* Bottom Copyright & Massive Text */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center space-y-8">
          <div className="flex w-full justify-between items-center text-sm text-neutral-500 flex-col md:flex-row gap-4">
            <p>© 2026 CHEA NIT TRICHY // ALCHEMY</p>
          </div>

          {/* Giant Background-like Text for Awwwards Feel */}
          <h1 className="text-[12vw] md:text-[8vw] lg:text-[140px] leading-none font-black tracking-tighter text-transparent overflow-hidden w-full text-center">
            <span className="bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-950 select-none">
              ALCHEMY 2026
            </span>
          </h1>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;