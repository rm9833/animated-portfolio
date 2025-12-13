import React, { useEffect } from 'react';

const ScrollAnimator: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selector = 'section, [data-animate]';
    const elements = Array.from(document.querySelectorAll(selector)) as Element[];

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('in-view'));
      return;
    }

    elements.forEach((el) => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ScrollAnimator;
