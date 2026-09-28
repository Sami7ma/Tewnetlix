import "./Skeleton.css";

function Skeleton({ className = "", ...props }) {
    return (
        <span
            className={`ui-skeleton ${className}`.trim()}
            aria-hidden="true"
            {...props}
        />
    );
}

export default Skeleton;
