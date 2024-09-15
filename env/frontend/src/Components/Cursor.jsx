import React from "react";
import { TweenMax } from "gsap";

export default function AnimatedCursor({
    color = "0, 0, 0",//16, 40, 69
    outerAlpha = 0.4,
    innerSize = 8,
    outerSize = 24,
    outerScale = 2,
    innerScale = 1
}) {
    const cursorOuterRef = React.useRef(null);
    const cursorInnerRef = React.useRef(null);
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = React.useState(true);
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveClickable, setIsActiveClickable] = React.useState(false);

    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        setCoords({ x: clientX, y: clientY });
        TweenMax.to(cursorInnerRef.current, { x: clientX, y: clientY, ease: "Power3.easeOut" });
        TweenMax.to(cursorOuterRef.current, {
            x: clientX - outerSize / 2,
            y: clientY - outerSize / 2,
            ease: "Power3.easeOut",
            delay: 0.1,
        });
    }, [outerSize]);

    const onMouseDown = React.useCallback(() => setIsActive(true), []);
    const onMouseUp = React.useCallback(() => setIsActive(false), []);
    const onMouseEnter = React.useCallback(() => setIsVisible(true), []);
    const onMouseLeave = React.useCallback(() => setIsVisible(false), []);

    React.useEffect(() => {
        if (isActive) {
            TweenMax.to(cursorInnerRef.current, { scale: innerScale });
            TweenMax.to(cursorOuterRef.current, { scale: outerScale });
        } else {
            TweenMax.to(cursorInnerRef.current, { scale: 1 });
            TweenMax.to(cursorOuterRef.current, { scale: 1 });
        }
    }, [isActive, innerScale, outerScale]);

    React.useEffect(() => {
        if (isActiveClickable) {
            TweenMax.to(cursorInnerRef.current, { scale: innerScale * 1.3 });
            TweenMax.to(cursorOuterRef.current, { scale: outerScale * 1.4 });
        }
    }, [isActiveClickable, innerScale, outerScale]);

    React.useEffect(() => {
        if (isVisible) {
            TweenMax.to([cursorInnerRef.current, cursorOuterRef.current], { opacity: 1 });
        } else {
            TweenMax.to([cursorInnerRef.current, cursorOuterRef.current], { opacity: 0 });
        }
    }, [isVisible]);

    React.useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave]);

    const styles = {
        cursorInner: {
            position: "fixed",
            borderRadius: "50%",
            width: innerSize,
            height: innerSize,
            pointerEvents: "none",
            backgroundColor: `rgba(${color}, 1)`,
            zIndex: 100000,
            willChange: "transform",
        },
        cursorOuter: {
            position: "fixed",
            borderRadius: "50%",
            pointerEvents: "none",
            width: outerSize,
            height: outerSize,
            backgroundColor: `rgba(${color}, ${outerAlpha})`,
            zIndex: 100000 - 1,
            willChange: "transform",

        }
    };

    return (
        <>
            <div ref={cursorOuterRef} style={styles.cursorOuter} />
            <div ref={cursorInnerRef} style={styles.cursorInner} />
        </>
    );
}
