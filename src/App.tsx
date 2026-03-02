import { useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import EventCarousel from './components/Carousel';
import StaggeredMenu from './components/SideNav';

gsap.registerPlugin(ScrollToPlugin);
const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'Events', ariaLabel: 'View events', link: '#events' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
  { label: 'Schedule', ariaLabel: 'View schedule', link: '#schedule' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

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
  const handleItemClick = useCallback((link: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = link.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 0 },
        ease: "none",
      });
    }
  }, []);

  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-screen">
      {/* Fixed SideNav overlay */}
      <StaggeredMenu
        logoUrl='/logo.png'
        isFixed={true}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        colors={['#1a1a2e', '#5227FF']}
        accentColor="#5227FF"
        menuButtonColor="#fff"
        openMenuButtonColor="#000"
        displayItemNumbering={true}
        displaySocials={true}
        onItemClick={handleItemClick}
      />

      {/* ─── Sections ─── */}
      <PlaceholderSection
        id="home"
        title="Alchemy '26"
        description="Where ideas transmute into innovation. Experience the premier technical symposium that brings together the brightest minds."
        gradient="#5227FF"
      />


      <section id="events" className="relative min-h-screen py-12">
        <EventCarousel />
      </section>

      <PlaceholderSection
        id="about"
        title="About Us"
        description="This section will showcase the story behind the symposium, our mission, and what makes Alchemy '26 a unique experience."
        gradient="#00C9A7"
      />

      <PlaceholderSection
        id="schedule"
        title="Schedule"
        description="Stay tuned — a full day-by-day breakdown of talks, workshops, and competitions will appear here."
        gradient="#FF6B6B"
      />

      <PlaceholderSection
        id="contact"
        title="Contact"
        description="Questions? Sponsorship enquiries? Drop us a line — our team is always happy to help."
        gradient="#FFD93D"
      />
    </div>
  );
}

export default App;
