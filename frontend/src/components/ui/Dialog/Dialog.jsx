import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import GlassSurface from "../GlassSurface/GlassSurface";
import IconButton from "../IconButton/IconButton";
import "./Dialog.css";

function Dialog({ open, title, children, onClose, labelledBy }) {
    const dialogRef = useRef(null);
    const restoreFocusRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.dataset.dialogOpen = "true";
        document.body.style.overflow = "hidden";
        restoreFocusRef.current = document.activeElement;
        const dialog = dialogRef.current;
        const focusable = dialog?.querySelector(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        );
        focusable?.focus();

        const handleKeyDown = event => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab" || !dialog) {
                return;
            }

            const elements = [...dialog.querySelectorAll(
                "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
            )].filter(element => !element.disabled);
            if (!elements.length) {
                return;
            }
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            delete document.body.dataset.dialogOpen;
            restoreFocusRef.current?.focus?.();
        };
    }, [onClose, open]);

    if (!open) {
        return null;
    }

    const titleId = labelledBy || "dialog-title";

    return (
        <div
            className="dialog-backdrop"
            role="presentation"
            onMouseDown={event => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <GlassSurface
                ref={dialogRef}
                className="dialog-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
            >
                <header className="dialog-header">
                    <h2 id={titleId}>{title}</h2>
                    <IconButton label="Close dialog" onClick={onClose}>
                        <X aria-hidden="true" />
                    </IconButton>
                </header>
                <div className="dialog-content">{children}</div>
            </GlassSurface>
        </div>
    );
}

export default Dialog;
