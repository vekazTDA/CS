"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    step: "Step 1",
    title: "You Reach Out",
    body: "Free consultation. We listen, help you gather the right docs, and tell you if your rights were violated.",
    icon: "/icons/step-1-reach-out.svg",
  },
  {
    step: "Step 2",
    title: "We Build Your Case",
    body: "We use the specific facts of your situation to identify every violation under the law and build a legal strategy for recovery.",
    icon: "/icons/step-2-build-case.svg",
  },
  {
    step: "Step 3",
    title: "We Fight",
    body: "We handle the disputes, demands, and lawsuits. You never talk to them again, and we fight to get you paid.",
    icon: "/icons/step-3-we-fight.svg",
  },
];

export default function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(0);

  // Whether the pointer has actually moved since a panel last opened. See handleHover.
  const pointerMoved = useRef(false);

  useEffect(() => {
    const onMove = () => {
      pointerMoved.current = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /*
   * The prototype opens these on mouse enter. Two things to defend against:
   *
   * 1. Touch browsers fire a synthetic mouseenter on tap, which would open the
   *    panel only for the click handler to toggle it straight back shut — so
   *    require a pointer that genuinely hovers.
   * 2. Expanding a panel reflows the ones below it. With the cursor sitting still
   *    over the list, a panel can slide underneath it and fire mouseenter without
   *    the user having moved, stealing the open state (and oscillating between
   *    two panels). Requiring a real mousemove since the last open rules that out;
   *    comparing coordinates would not, because keyboard and synthetic activation
   *    both report 0,0.
   */
  function handleHover(index: number) {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (!pointerMoved.current) return;

    pointerMoved.current = false;
    setOpenIndex(index);
  }

  return (
    <section id="how-it-works" className={styles.section}>
      <h2 className={styles.heading}>How it works</h2>
      <p className={styles.intro}>
        Only three steps and zero cost. We hold them accountable.
      </p>

      <div className={styles.layout}>
        <div className={styles.collage}>
          <div className={styles.greenPanel} aria-hidden="true" />

          {/*
            In Figma only the photo is masked by the rounded rect — the green panel
            and the badges sit outside it, so the badges may overhang the edge.
          */}
          <div className={styles.personClip}>
            <div className={styles.personBox}>
              <Image
                src="/images/how-person.png"
                alt="Client contacting Consumer Attorneys from their phone"
                width={954}
                height={1100}
                className={styles.personImg}
                priority={false}
              />
            </div>
          </div>

          <div className={`${styles.badge} ${styles.badgePhone}`} aria-hidden="true">
            <Image src="/icons/badge-phone.png" alt="" width={102} height={102} />
          </div>
          <div className={`${styles.badge} ${styles.badgeMessage}`} aria-hidden="true">
            <Image src="/icons/badge-message.png" alt="" width={71} height={71} />
          </div>

          <div className={`${styles.tile} ${styles.tileMeeting}`}>
            <Image
              src="/images/how-tile-meeting.jpg"
              alt=""
              fill
              sizes="153px"
              aria-hidden="true"
            />
          </div>
          <div className={`${styles.tile} ${styles.tileFight}`}>
            <Image
              src="/images/how-tile-fight.jpg"
              alt=""
              fill
              sizes="153px"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.steps}>
          {STEPS.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div key={item.title} className={styles.panel} data-open={isOpen}>
                <button
                  type="button"
                  className={styles.panelHeader}
                  onClick={() => {
                    pointerMoved.current = false;
                    setOpenIndex(isOpen ? -1 : index);
                  }}
                  onMouseEnter={() => handleHover(index)}
                  aria-expanded={isOpen}
                  aria-controls={`how-step-${index}`}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={31}
                    height={31}
                    className={styles.stepIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.panelLabels}>
                    <span className={styles.stepNumber}>{item.step}</span>
                    <span className={styles.stepTitle}>{item.title}</span>
                  </span>
                  <Image
                    src="/icons/chevron.svg"
                    alt=""
                    width={22}
                    height={12}
                    className={styles.chevron}
                    aria-hidden="true"
                  />
                </button>

                <div id={`how-step-${index}`} className={styles.panelBody} role="region">
                  <div className={styles.panelBodyInner}>
                    <p>{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <a href="#start-your-case" className={styles.cta}>
            <span>Tell us about your situation</span>
            <Image
              src="/icons/cta-arrow-lg.svg"
              alt=""
              width={38}
              height={38}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
