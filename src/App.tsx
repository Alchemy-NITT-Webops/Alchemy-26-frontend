import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import EventCarousel from './components/Carousel';

import HeroSection from './components/herosection/HeroSection';
import Preloader from './components/Preloader';
import ZoomParallax from './components/ZoomParalax/ZoomParallax';
import About from './components/Aboutus/About';
import EVENTS_DATA from './data/events';
import SplashCursor from './components/SplashCursor';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import WORKSHOPS_DATA from './data/workshops';
import AlchemyFAQ from './components/FAQ/Faq';
import Footer from './components/Footer/Footer';
import GuestLecture from './components/GuestLecture/GuestLecture';
import { GUEST_LECTURES_DATA } from './data/guestLectures';

gsap.registerPlugin(ScrollToPlugin);


/* ───── Placeholder section component ───── */
function PlaceholderSection({
  id,
  title,
  description,
  gradient,
}: {
  id: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      {/* subtle top-glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${gradient}, transparent)`,
        }}
      />



      <div className="relative text-center max-w-3xl mx-auto">
        <h2
          className="text-5xl sm:text-7xl font-black tracking-tight mb-6"
          style={{
            background: `linear-gradient(135deg, ${gradient}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >

          {title}
        </h2>
        <p className="text-lg sm:text-xl text-[#888] leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}

/* ───── App ───── */
function App() {
  const [complete, setComplete] = useState(false);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Removed old horizontal slide animation to allow native scrolling and GSAP scrollTrigger in AboutUs.tsx

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null); // State to hold Lenis instance

  useEffect(() => {
    const lenis = new Lenis({ // Create Lenis instance
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8
    });
    setLenisInstance(lenis); // Set Lenis instance in state

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Preloader setComplete={setComplete} />
      <div className={`relative bg-[#0a0a0a] text-white min-h-screen ${complete ? 'complete' : 'not_complete'}`}>
        <Navbar isMobile={isMobile} lenis={lenisInstance} />
        {/* Fixed SideNav overlay */}

        {/* ─── Hero Section ─── */}
        <HeroSection ready={complete} />

        {/* ─── About Us ─── */}
        <About />

        {/* ─── Highlights (Zoom Parallax) ─── */}
        <ZoomParallax />

        {/* ─── Events ─── */}
        <section id="events" className="relative min-h-screen py-12">
          <EventCarousel events={EVENTS_DATA} />
        </section>

        {/* ─── Workshops ─── */}
        <section id="workshops" className="relative min-h-screen py-12">
          <EventCarousel events={WORKSHOPS_DATA} />
        </section>

        {/* ─── Guest Lectures ─── */}
        <section id="guest-lectures" className="relative min-h-screen py-12 flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-white" style={{
            background: 'linear-gradient(135deg, #A855F7, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Guest Lectures
          </h2>
          <GuestLecture items={GUEST_LECTURES_DATA} />
        </section>

        <section id="faq" className="relative min-h-screen py-12">
          <AlchemyFAQ />
        </section>

        <PlaceholderSection
          id="schedule"
          title="Schedule"
          description="Stay tuned — a full day-by-day breakdown of talks, workshops, and competitions will appear here."
          gradient="#FF6B6B"
        />

        <Footer />
        {
          window.innerWidth >= 1024 && <SplashCursor />
        }
      </div>
    </>
  );
}

export default App;
