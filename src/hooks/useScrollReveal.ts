import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Fade-up reveal for all .card elements inside the returned ref container */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.card', el);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
          }),
        start: 'top 90%',
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Bidirectional fade for all .reveal-img elements — CSS transition toggled by IntersectionObserver */
export function useImageReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const imgs = el.querySelectorAll<Element>('.reveal-img');
    if (!imgs.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
      },
      { rootMargin: '-8% 0px' },
    );
    imgs.forEach(img => io.observe(img));
    return () => io.disconnect();
  }, []);

  return ref;
}
