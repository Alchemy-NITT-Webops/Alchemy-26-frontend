import './GetStartedButton.css';
import Lenis from 'lenis';

const GetStartedButton = ({ padding, lenis }: { padding: string; lenis?: Lenis | null }) => {
    return (
        <button
            className="get-started-btn"
            style={{ padding }}
            onClick={(e) => {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo('#events', {
                        duration: 3.5,
                        easing: (t) => 1 - Math.pow(1 - t, 5) // quintic out
                    });
                } else {
                    window.location.hash = '#events';
                }
            }}
        >
            Explore Events
        </button>
    );
};

export default GetStartedButton;