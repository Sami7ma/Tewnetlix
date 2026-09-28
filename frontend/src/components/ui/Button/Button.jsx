import { forwardRef } from "react";
import "./Button.css";

const Button = forwardRef(function Button(
    {
        children,
        className = "",
        variant = "primary",
        type = "button",
        ...props
    },
    ref,
) {
    return (
        <button
            ref={ref}
            type={type}
            className={`ui-button ui-button-${variant} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;
