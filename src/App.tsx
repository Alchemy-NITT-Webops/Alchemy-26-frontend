import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import EventCarousel from './components/Carousel';

import HeroSection from './components/herosection/HeroSection';
import Preloader from './components/Preloader';
import ZoomParallax from './components/ZoomParalax/ZoomParallax';
import About from './components/Aboutus/About';
import SplashCursor from './components/SplashCursor';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import AlchemyFAQ from './components/FAQ/Faq';
import Footer from './components/Footer/Footer';
import GuestLecture from './components/GuestLecture/GuestLecture';
import Schedule from './components/Schedule/Schedule';

import { strapiApi } from './data/api/strapiApi';
import { mockApi } from './data/api/mockApi';
import {
  strapiEventsToEventItems,
  strapiGuestLecturesToItems,
  toEventItems,
  toGuestLectureItems
} from './data/domain/converters';
import type { EventItem, GuestLectureItem } from './data/domain/types';

gsap.registerPlugin(ScrollToPlugin);



/* ───── App ───── */
function App() {
  const [complete, setComplete] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [workshops, setWorkshops] = useState<EventItem[]>([]);
  const [guestLectures, setGuestLectures] = useState<GuestLectureItem[]>([]);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Try Strapi first, fallback to mock data
    strapiApi.getEvents({ filters: { category: { $ne: 'WORKSHOP' } } })
      .then(res => setEvents(strapiEventsToEventItems(res.data)))
      .catch((err) => {
        console.warn('Failed to fetch events from Strapi, falling back to mock:', err);
        setEvents(toEventItems(mockApi.getEvents()));
      });

    // Currently workshops and events are the same endpoint, but we can filter by category if needed
    // For now, if Strapi fails, we use mock workshops
    strapiApi.getEvents({ filters: { category: { $eq: 'WORKSHOP' } } })
      .then(res => setWorkshops(strapiEventsToEventItems(res.data)))
      .catch((err) => {
        console.warn('Failed to fetch workshops from Strapi, falling back to mock:', err);
        setWorkshops(toEventItems(mockApi.getWorkshops()));
      });

    strapiApi.getGuestLectures()
      .then(res => setGuestLectures(strapiGuestLecturesToItems(res.data)))
      .catch((err) => {
        console.warn('Failed to fetch guest lectures from Strapi, falling back to mock:', err);
        setGuestLectures(toGuestLectureItems(mockApi.getGuestLectures()));
      });
  }, []);

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
        <HeroSection ready={complete} lenis={lenisInstance} />


        {/* ─── Highlights (Zoom Parallax) ─── */}
        <ZoomParallax />

        {/* ─── About Us ─── */}
        <About />

        <section id="schedule">
          <Schedule />
        </section>

        {/* ─── Events ─── */}
        <section id="events">
          <EventCarousel events={events} title="Events" />
        </section>

        {/* ─── Workshops ─── */}
        <section id="workshops">
          <EventCarousel events={workshops} title="Workshops" />
        </section>

        {/* ─── Guest Lectures ─── */}
        <section id="guest-lectures" className="relative py-20 flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-white" style={{
            background: 'linear-gradient(135deg, #A855F7, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Guest Lectures
          </h2>
          <GuestLecture items={guestLectures} />
        </section>

        <div id="faq">
          <AlchemyFAQ />
        </div>

        <Footer />
        {
          window.innerWidth >= 1024 && <SplashCursor />
        }
      </div>
    </>
  );
}

export default App;
