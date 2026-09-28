import "./EmptyState.css";
import GlassSurface from "../../ui/GlassSurface/GlassSurface";

function EmptyState({
    title = "Nothing found",
    message = "Try changing your filters.",
}) {
    return (
        <GlassSurface as="section" className="state-panel empty-state" disabled>
            <h2>{title}</h2>
            <p>{message}</p>
        </GlassSurface>
    );
}

export default EmptyState;
