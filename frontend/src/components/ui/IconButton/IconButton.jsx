import { forwardRef } from "react";
import Button from "../Button/Button";
import "./IconButton.css";

const IconButton = forwardRef(function IconButton(
    { label, children, className = "", variant = "subtle", ...props },
    ref,
) {
    return (
        <Button
            ref={ref}
            className={`ui-icon-button ${className}`.trim()}
            variant={variant}
            aria-label={label}
            {...props}
        >
            {children}
        </Button>
    );
});

export default IconButton;
