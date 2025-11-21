import React, { useEffect, useRef } from "react";

interface Props {
  slides: React.ReactNode[];
  onSlideChange?: (index: number) => void;
}

export const slideTo = (index: number) => {
  const container = document.getElementById("presentation-container");
  if (container) {
    container.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  }
};

export default function PresentationWrapper({ slides, onSlideChange }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onSlideChange) return;
    const node = containerRef.current;
    if (!node) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const index = Math.round(
        containerRef.current.scrollTop / window.innerHeight
      );
      const clamped = Math.min(Math.max(index, 0), slides.length - 1);
      onSlideChange(clamped);
    };

    handleScroll();
    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, [onSlideChange, slides.length]);

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
        <div
          key={index}
          style={{
            width: "100%",
            minHeight: "100vh",
            scrollSnapAlign: "start",
            boxSizing: "border-box",
            paddingBottom: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}
