import { ChevronRight } from 'lucide-react';
import './HeroSection.css';
import GetStartedButton from '../common/GetStartedButton';
import MaskText from '../common/MaskText/index';
import {
  paragraphPhrases,
  phrases,
} from './constants';

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  return (
    <section className="hero-wrapper h-screen" id="home">
      <div className="hero-inner">
        
        <div className="hero-text-container flex-col scale-90 justify-center items-center">
          
            <>
              <MaskText phrases={phrases} tag="h1" ready={ready} />
              <MaskText phrases={paragraphPhrases} tag="p" ready={ready} />
            </>
          
        </div>
        <GetStartedButton padding="1rem 2.5rem" />
      </div>
    </section>
  );
};

export default HeroSection;