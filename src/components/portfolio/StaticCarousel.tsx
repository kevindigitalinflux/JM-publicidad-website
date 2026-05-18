import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface StaticCarouselProps {
  images: string[];
  imageHeight?: number;
}

const GAP = 16;

function getPerPage() {
  return window.innerWidth < 640 ? 2 : 3;
}

/** Paginated image carousel — prev/next arrows, GSAP slide animation */
export function StaticCarousel({ images, imageHeight = 280 }: StaticCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [perPage, setPerPage] = useState(getPerPage);
  const [itemWidth, setItemWidth] = useState(0);
  const [page, setPage] = useState(0);

  const measure = useCallback((pp: number) => {
    const el = containerRef.current;
    if (!el) return;
    setItemWidth((el.clientWidth - GAP * (pp - 1)) / pp);
  }, []);

  useLayoutEffect(() => {
    const pp = getPerPage();
    setPerPage(pp);
    measure(pp);

    const ro = new ResizeObserver(() => {
      const next = getPerPage();
      setPerPage(next);
      measure(next);
      setPage(0);
      if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const totalPages = Math.ceil(images.length / perPage);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track || itemWidth === 0) return;
    gsap.to(track, {
      x: -(next * perPage * (itemWidth + GAP)),
      duration: 0.45,
      ease: 'power2.inOut',
    });
    setPage(next);
  };

  return (
    <div className="px-6 max-w-lg mx-auto lg:max-w-3xl">
      <div ref={containerRef} className="overflow-hidden">
        <div ref={trackRef} style={{ display: 'flex', gap: GAP }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Portfolio image ${i + 1}`}
              loading="lazy"
              style={{
                flexShrink: 0,
                width: itemWidth > 0 ? itemWidth : undefined,
                height: imageHeight,
                objectFit: 'cover',
                borderRadius: 12,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-inter text-jm-body/60 text-xs">
          {page + 1} / {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous"
            className="w-10 h-10 rounded-full bg-jm-bg-card flex items-center justify-center text-jm-primary disabled:opacity-30 hover:bg-jm-primary hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => goTo(page + 1)}
            disabled={page >= totalPages - 1}
            aria-label="Next"
            className="w-10 h-10 rounded-full bg-jm-bg-card flex items-center justify-center text-jm-primary disabled:opacity-30 hover:bg-jm-primary hover:text-white transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
