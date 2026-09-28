import "./ErrorState.css";
import Button from "../../ui/Button/Button";

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
                <Button type="button" variant="secondary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </section>
    );
}

export default ErrorState;
