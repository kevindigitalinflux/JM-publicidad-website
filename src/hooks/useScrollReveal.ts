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

/** Bidirectional fade for all .reveal-img elements — fades in on scroll down, out on scroll up */
export function useImageReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLElement>('.reveal-img', el);
      if (!imgs.length) return;

      gsap.set(imgs, { opacity: 0, y: 24 });

      ScrollTrigger.batch(imgs, {
        onEnter:     (batch) => gsap.to(batch, { opacity: 1, y: 0,   duration: 0.7, stagger: 0.12, ease: 'power2.out' }),
        onLeave:     (batch) => gsap.to(batch, { opacity: 0, y: -24, duration: 0.5, stagger: 0.08, ease: 'power2.in' }),
        onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0,   duration: 0.7, stagger: 0.12, ease: 'power2.out' }),
        onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 24,  duration: 0.5, stagger: 0.08, ease: 'power2.in' }),
        start: 'top 88%',
        end:   'bottom 12%',
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
