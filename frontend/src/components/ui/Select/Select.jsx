import "./Select.css";

function Select({
    label,
    id,
    hideLabel = false,
    className = "",
    children,
    ...props
}) {
    return (
        <label className={`ui-select ${className}`.trim()} htmlFor={id}>
            <span className={hideLabel ? "visually-hidden" : ""}>{label}</span>
            <select id={id} {...props}>
                {children}
            </select>
        </label>
    );
}

export default Select;
