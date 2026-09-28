import "./Pill.css";

function Pill({ children, selected = false, className = "", ...props }) {
    return (
        <span
            className={`ui-pill ${selected ? "ui-pill-selected" : ""} ${className}`.trim()}
            {...props}
        >
            {children}
        </span>
    );
}

export default Pill;
