import './HeroSection.css';
import GetStartedButton from '../common/GetStartedButton';
import MaskText from '../common/MaskText/index';
import {
  paragraphPhrases,
  phrases,
} from '../../data/hero';
import CountdownTimer from '../CountdownTimer';

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  return (
    <section className="hero-wrapper" id="home">
      <div className="hero-inner">

        <div className="hero-text-container">

          <>
            <MaskText phrases={phrases} tag="h1" ready={ready} />
            <MaskText phrases={paragraphPhrases} tag="p" ready={ready} />
          </>

        </div>

        {/* DTG Counter Display Header */}
        <div className="dtg-container flex flex-col items-center justify-center mb-4">
          <span className="text-sm font-semibold text-[#888] uppercase tracking-[0.3em] mb-2 z-10">Days to Go</span>
          <div className="scale-75 sm:scale-90 md:scale-100 z-10 -mt-8">
            <CountdownTimer />
          </div>
        </div>

        <div className="hero-btn-wrapper">
          <GetStartedButton padding="1rem 2.5rem" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;