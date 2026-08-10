import "./LoadingSpinner.css";

const LoadingSpinner = ({
    size = "medium",
    text = ""
}) => {

    return (
        <div className={`loading-spinner-container ${size}`}>

            <div className="spinner"></div>

            {text && (
                <span className="loading-text">
                    {text}
                </span>
            )}

        </div>
    );
};

export default LoadingSpinner;
