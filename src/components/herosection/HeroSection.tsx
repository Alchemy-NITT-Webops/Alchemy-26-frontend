import './HeroSection.css';
import GetStartedButton from '../common/GetStartedButton';
import MaskText from '../common/MaskText/index';
import {
  paragraphPhrases,
  phrases,
} from './constants';
import CountdownTimer from '../CountdownTimer';

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

        {/* DTG Counter Display Header */}
        <div className="flex flex-col items-center justify-center mb-4">
          <span className="text-sm font-semibold text-[#888] uppercase tracking-[0.3em] mb-2 z-10">Days to Go</span>
          <div className="scale-75 sm:scale-90 md:scale-100 z-10 -mt-8">
            <CountdownTimer />
          </div>
        </div>

        <GetStartedButton padding="1rem 2.5rem" />
      </div>
    </section>
  );
};

export default HeroSection;