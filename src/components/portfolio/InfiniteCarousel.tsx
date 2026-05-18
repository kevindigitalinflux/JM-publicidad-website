import { useEffect, useRef } from 'react';

interface InfiniteCarouselProps {
  images: string[];
  direction: 'left' | 'right';
  /** Seconds for one full cycle. Default 40. */
  speed?: number;
  /** Image height in px. Default 300. */
  imageHeight?: number;
  /** Max images to render (capped for mobile perf). Default 10. */
  maxImages?: number;
}

/** Infinite auto-scrolling image strip. GPU-composited, pauses off-screen and when tab hidden. */
export function InfiniteCarousel({
  images,
  direction,
  speed = 40,
  imageHeight = 300,
  maxImages = 10,
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const animationName = direction === 'left' ? 'jm-scroll-left' : 'jm-scroll-right';

  // Pause when scrolled off-screen
  useEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    if (!container || !track) return;

    const io = new IntersectionObserver(
      ([entry]) => { track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'; },
      { threshold: 0 }
    );
    io.observe(container);

    // Also pause when the browser tab is hidden (saves GPU on mobile)
    const onVisibility = () => {
      track.style.animationPlayState = document.hidden ? 'paused' : 'running';
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Cap images to keep DOM lean on mobile — the loop still feels seamless with 10
  const capped = images.slice(0, maxImages);
  const looped = [...capped, ...capped];

  return (
    <div
      ref={containerRef}
      style={{ overflow: 'hidden', contain: 'layout style' }}
    >
      <div
        ref={trackRef}
        className="jm-carousel-track"
        style={{
          display: 'flex',
          gap: '1rem',
          width: 'max-content',
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: 'paused',
        }}
      >
        {looped.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            style={{
              height: `min(${imageHeight}px, 55vw)`,
              width: 'auto',
              flexShrink: 0,
              borderRadius: '0.75rem',
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
    </div>
  );
}
