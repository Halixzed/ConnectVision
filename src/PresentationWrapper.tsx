import React, { useEffect, useRef } from "react";

interface Props {
  slides: React.ReactNode[];
  onSlideChange?: (index: number) => void;
}

export const slideTo = (index: number) => {
  const container = document.getElementById("presentation-container");
  if (container) {
    const slideHeight = container.clientHeight || window.innerHeight;
    container.scrollTo({
      top: index * slideHeight,
      behavior: "smooth",
    });
  }
};

export default function PresentationWrapper({ slides, onSlideChange }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!onSlideChange) return;
    const node = containerRef.current;
    if (!node) return;

    const handleScroll = () => {
      const slideHeight = node.clientHeight || window.innerHeight;
      const index = Math.round(node.scrollTop / slideHeight);
      const clamped = Math.min(Math.max(index, 0), slides.length - 1);
      if (clamped !== activeIndexRef.current) {
        activeIndexRef.current = clamped;
        onSlideChange(clamped);
      }
    };

    handleScroll();
    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, [onSlideChange, slides.length]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let unlockTimer: number | undefined;

    const handleWheel = (event: WheelEvent) => {
      if (!node) return;
      if (Math.abs(event.deltaY) < 4) return;

      const allowNestedScroll = () => {
        let el = event.target as HTMLElement | null;
        while (el && el !== node) {
          if (el.scrollHeight - el.clientHeight > 1) {
            const atTop = el.scrollTop <= 0;
            const atBottom =
              Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

            if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
              return true;
            }
          }
          el = el.parentElement;
        }
        return false;
      };

      if (allowNestedScroll()) return;

      event.preventDefault();
      if (isAnimatingRef.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(activeIndexRef.current + direction, 0),
        slides.length - 1
      );

      if (nextIndex === activeIndexRef.current) return;

      isAnimatingRef.current = true;
      activeIndexRef.current = nextIndex;
      const slideHeight = node.clientHeight || window.innerHeight;
      node.scrollTo({
        top: nextIndex * slideHeight,
        behavior: "smooth",
      });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, 550);
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", handleWheel);
      window.clearTimeout(unlockTimer);
    };
  }, [slides.length]);

  return (
    <div
      id="presentation-container"
      ref={containerRef}
      className="presentation-container vertical"
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {slides.map((slide, index) => (
        <section className="slide-shell" key={index}>
          <div className="slide-scroll">{slide}</div>
        </section>
      ))}
    </div>
  );
}
