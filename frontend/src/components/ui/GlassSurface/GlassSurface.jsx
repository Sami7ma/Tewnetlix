import { forwardRef, useEffect, useRef } from "react";
import { liquidGlass } from "../../../lib/liquidGlass";
import "./GlassSurface.css";

const STRENGTHS = {
    subtle: { scale: -60, chroma: 4, blur: 5, fallbackBlur: 14 },
    standard: { scale: -112, chroma: 6, blur: 3, fallbackBlur: 16 },
    strong: { scale: -150, chroma: 7, blur: 4, fallbackBlur: 20 },
};

const GlassSurface = forwardRef(function GlassSurface(
    {
        as: Element = "div",
        children,
        className = "",
        strength = "standard",
        radius,
        disabled = false,
        style,
        ...props
    },
    forwardedRef,
) {
    const localRef = useRef(null);
    const glassRef = useRef(null);
    const setRef = node => {
        localRef.current = node;
        if (typeof forwardedRef === "function") {
            forwardedRef(node);
        } else if (forwardedRef) {
            forwardedRef.current = node;
        }
    };

    useEffect(() => {
        const element = localRef.current;
        if (!element || disabled || !window.matchMedia) {
            return undefined;
        }

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reducedMotion.matches) {
            return undefined;
        }

        const options = STRENGTHS[strength] || STRENGTHS.standard;
        glassRef.current = liquidGlass(element, {
            ...options,
            radius,
        });

        return () => {
            glassRef.current?.destroy();
            glassRef.current = null;
        };
    }, [disabled, radius, strength]);

    const surfaceStyle = {
        ...style,
        ...(radius !== undefined
            ? { "--glass-radius": typeof radius === "number" ? `${radius}px` : radius }
            : {}),
    };

    return (
        <Element
            ref={setRef}
            className={`glass-surface ${disabled ? "glass-surface-disabled" : ""} ${className}`.trim()}
            style={surfaceStyle}
            {...props}
        >
            {children}
        </Element>
    );
});

export default GlassSurface;
