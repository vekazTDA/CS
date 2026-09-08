"use client";

import { useEffect } from "react";

const FORM_ID = "start-your-case";
const HASH = `#${FORM_ID}`;

function isDesktop() {
  return window.matchMedia("(min-width: 641px)").matches;
}

/*
 * Sticky nav sits at top: 24px. Hash jumps would pin the form under that bar.
 * Desktop needs more breathing room than mobile — the heading sits in the
 * section's top padding and was still landing under the logo / phone pill.
 */
function navClearance() {
  const nav = document.querySelector("header");
  const bar = nav instanceof HTMLElement ? nav.offsetHeight : 56;
  return 24 + bar + (isDesktop() ? 56 : 24);
}

function scrollToForm() {
  const form = document.getElementById(FORM_ID);
  if (!form) return;

  const top = form.getBoundingClientRect().top + window.scrollY - navClearance();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduce ? "auto" : "smooth",
  });

  // Desktop only: after smooth scroll settles, nudge if the nav still covers the heading.
  if (!isDesktop()) return;
  window.setTimeout(
    () => {
      const nav = document.querySelector("header");
      const bar = nav instanceof HTMLElement ? nav.offsetHeight : 56;
      const clear = 24 + bar + 24;
      const formTop = form.getBoundingClientRect().top;
      if (formTop < clear) {
        window.scrollBy({ top: formTop - clear, behavior: "auto" });
      }
    },
    reduce ? 0 : 450,
  );
}

export default function ScrollToForm() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(`a[href="${HASH}"]`)) return;

      event.preventDefault();
      scrollToForm();
      if (location.hash !== HASH) {
        history.pushState(null, "", HASH);
      }
    };

    // Capture so nested images/spans inside the CTAs still hit this path first.
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", scrollToForm);
    if (location.hash === HASH) {
      requestAnimationFrame(scrollToForm);
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", scrollToForm);
    };
  }, []);

  return null;
}
