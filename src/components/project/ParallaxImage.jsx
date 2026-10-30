import React, { useEffect, useRef } from "react";

// How far the image drifts, as a fraction of its frame height, from when the
// frame enters the viewport to when it leaves. The image is scaled up enough
// to cover the drift so no edges show.
const DRIFT = 0.3;
const SCALE = 1 + DRIFT + 0.02;

// Image that scrolls slightly slower than the page inside a clipping frame.
// `className` sizes and positions the frame, as it would the plain <img>.
const ParallaxImage = ({ src, alt = "", className = "" }) => {
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = frameRef.current;
      const img = imgRef.current;
      if (!el || !img) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // 0 as the frame enters at the bottom, 1 as it leaves at the top.
      const p = (vh - rect.top) / (vh + rect.height);
      const y = (p - 0.5) * DRIFT * rect.height;
      img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${SCALE})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className="relative h-full w-full overflow-hidden rounded-[inherit]"
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="block h-full w-full object-cover object-center will-change-transform"
          style={{ transform: `scale(${SCALE})` }}
        />
      </div>
    </div>
  );
};

export default ParallaxImage;
