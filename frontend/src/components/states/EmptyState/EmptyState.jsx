import "./EmptyState.css";

function EmptyState({
    title = "Nothing found",
    message = "Try changing your filters.",
}) {
    return (
        <section className="state-panel empty-state">
            <h2>{title}</h2>
            <p>{message}</p>
        </section>
    );
}

export default EmptyState;
