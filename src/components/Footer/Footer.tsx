import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, PenTool } from 'lucide-react';
import { socials } from '../../data/footer';
import { fetchContactDetails } from '../../services/api';
import type { ContactDetails } from '../../services/api';

const Footer: React.FC = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);

  useEffect(() => {
    async function loadContacts() {
      const data = await fetchContactDetails();
      if (data) {
        // Address from API comes as a single string, we need to split it by comma to match the old format
        // Or if it's already an array... Let's safely convert it
        let addressLines: string[] = [];
        if (typeof data.address === 'string') {
            addressLines = data.address.split(',').map(s => s.trim());
        } else if (Array.isArray(data.address)) {
            addressLines = data.address;
        }
        setContactDetails({ ...data, address: addressLines as any });
      }
    }
    loadContacts();
  }, []);
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-linear-to-r from-purple-600 via-violet-600 to-pink-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Top Section / Header */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-violet-400 to-pink-400 mb-4 leading-normal">
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
            {contactDetails ? (
              <>
                <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                  <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">
                    {contactDetails.email}
                  </motion.span>
                </a>
                {contactDetails.contacts.map((contact) => (
                  <a key={contact.name} href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 group">
                    <Phone className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
                    <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">
                      {contact.name}: {contact.phone}
                    </motion.span>
                  </a>
                ))}
                <a
                  href="https://maps.app.goo.gl/maBbeMMk6hipKCZG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group pt-2"
                >
                  <MapPin className="w-5 h-5 text-purple-400 mt-1 shrink-0 group-hover:text-purple-300 transition-colors" />
                  <motion.span variants={textHover} whileHover="hover" className="text-neutral-400 leading-relaxed">
                    {Array.isArray(contactDetails.address) ? contactDetails.address.map((line: string, i: number) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < contactDetails.address.length - 1 && <br />}
                      </React.Fragment>
                    )) : contactDetails.address}
                  </motion.span>
                </a>
              </>
            ) : (
                <div className="text-neutral-400 animate-pulse">Loading contacts...</div>
            )}
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
              {socials.map((social) => (
                <a key={social.label} href={social.url} target="_blank" className="flex items-center gap-3 group w-fit">
                  {social.icon === 'Linkedin' && <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />}
                  {social.icon === 'Instagram' && <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-pink-500 transition-colors" />}
                  {social.icon === 'PenTool' && <PenTool className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />}
                  <motion.span variants={textHover} whileHover="hover" className="text-neutral-400">{social.label}</motion.span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Credits Section */}
          <motion.div variants={itemVariants} className="flex flex-col justify-end space-y-2 lg:text-right lg:items-end">
            <p className="text-sm text-neutral-500">Made with 💜 by</p>
            <div className="text-lg font-medium">
              <motion.a
                href="https://www.linkedin.com/in/khadeer-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                variants={textHover}
                whileHover="hover"
                className="text-white relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-pink-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Khadeer
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full h-px bg-neutral-800 mb-8" />

        {/* Bottom Copyright & Massive Text */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center space-y-8">
          <div className="flex w-full justify-between items-center text-sm text-neutral-500 flex-col md:flex-row gap-4">
            <p>© 2026 CHEA NIT TRICHY // ALCHEMY</p>
          </div>

          {/* Giant Background-like Text for Awwwards Feel */}
          <h1 className="text-[12vw] md:text-[8vw] lg:text-[140px] leading-none font-black tracking-tighter text-transparent overflow-hidden w-full text-center">
            <span className="bg-clip-text bg-linear-to-b from-neutral-700 to-neutral-950 select-none">
              ALCHEMY 2026
            </span>
          </h1>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;