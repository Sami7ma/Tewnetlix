import "./LoadingState.css";

function LoadingState({ size = "medium", text = "" }) {
    return (
        <div
            className={`loading-state loading-state-${size}`}
            role="status"
            aria-live="polite"
        >
            <span className="loading-state-spinner" aria-hidden="true" />
            {text && <span>{text}</span>}
        </div>
    );
}

export default LoadingState;
