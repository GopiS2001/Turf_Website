"use client";

import { useEffect } from "react";

/**
 * Marks every `[data-reveal]` element with `data-shown` as it scrolls into view.
 * Uses an attribute React doesn't manage, so re-renders that rewrite `className`
 * can't hide an element again.
 */
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const show = (el: Element) => el.setAttribute("data-shown", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 },
    );

    const pending = () => document.querySelectorAll("[data-reveal]:not([data-shown])");

    const observeAll = () => pending().forEach((el) => observer.observe(el));

    // Failsafe: anything already above the bottom of the viewport (e.g. after an
    // anchor jump) is shown immediately.
    const revealPassed = () =>
      pending().forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });

    observeAll();
    revealPassed();

    // Pick up elements rendered later (e.g. gallery filters).
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        revealPassed();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", revealPassed);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", revealPassed);
    };
  }, []);

  return null;
}
