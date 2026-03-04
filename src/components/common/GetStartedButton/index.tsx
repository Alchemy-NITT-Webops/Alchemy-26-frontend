import './GetStartedButton.css';

const GetStartedButton = ({ padding }: { padding: string }) => {
    return (
        <a
            className="get-started-btn"
            style={{ padding }}
            href="#events"
        >
            Explore Events
        </a>
    );
};

export default GetStartedButton;