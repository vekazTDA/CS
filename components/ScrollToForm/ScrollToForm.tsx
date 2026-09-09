"use client";

import { useEffect } from "react";

const FORM_ID = "start-your-case";
const HASH = `#${FORM_ID}`;

function isDesktop() {
  return window.matchMedia("(min-width: 641px)").matches;
}

/*
 * Sticky nav sits at top: 24px. The "usable" viewport — the area the nav
 * doesn't cover in its stuck position — starts where the nav's own box ends.
 */
function navBottom() {
  const nav = document.querySelector("header");
  const bar = nav instanceof HTMLElement ? nav.offsetHeight : 56;
  return 24 + bar;
}

/*
 * Minimum clearance under the nav — used only by the post-scroll settle
 * check below, as a drift-correction floor, not as a fallback target.
 */
function navClearance() {
  return navBottom() + (isDesktop() ? 56 : 24);
}

/*
 * Where the section's top should land in the viewport: centered in the
 * space below the sticky nav. Always centers — on short viewports where the
 * section is taller than that space, this can put the heading above the
 * fold; that's an accepted tradeoff, not a bug.
 */
function targetOffset(sectionHeight: number) {
  const usableTop = navBottom();
  const usableHeight = window.innerHeight - usableTop;
  return usableTop + (usableHeight - sectionHeight) / 2;
}

function scrollToForm() {
  const form = document.getElementById(FORM_ID);
  if (!form) return;

  const top =
    form.getBoundingClientRect().top + window.scrollY - targetOffset(form.offsetHeight);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduce ? "auto" : "smooth",
  });

  // Desktop only: after smooth scroll settles, nudge if the nav still covers the heading.
  if (!isDesktop()) return;
  window.setTimeout(
    () => {
      const clear = navClearance();
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
