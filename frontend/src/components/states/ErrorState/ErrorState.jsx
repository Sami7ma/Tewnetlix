import "./ErrorState.css";

function ErrorState({
    title = "Unable to load content",
    message = "Please try again.",
    actionLabel = "Try again",
    onAction,
}) {
    return (
        <section className="state-panel error-state" role="alert">
            <h2>{title}</h2>
            <p>{message}</p>
            {onAction && (
                <button type="button" onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </section>
    );
}

export default ErrorState;
