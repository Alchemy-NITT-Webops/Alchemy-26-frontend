import './ZoomParallax.css';
import Picture1 from '../../assets/highlights/highlight_6.png';
import Picture2 from '../../assets/highlights/highlight_2.png';
import Picture3 from '../../assets/highlights/highlight_3.png';
import Picture4 from '../../assets/highlights/highlight_4.png';
import Picture5 from '../../assets/highlights/highlight_5.png';
import Picture6 from '../../assets/highlights/highlight_1.png';

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export const ZoomParallax = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
  ];

  return (
    <div ref={container} className="zoom-parallax-container" id="highlights">
      <div className="zoom-parallax-sticky">
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className="zoom-parallax-el">
              <div className="zoom-parallax-img-container">
                <img src={src} alt={`Highlight ${index + 1}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoomParallax;