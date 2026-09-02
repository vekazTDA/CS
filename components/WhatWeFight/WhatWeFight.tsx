"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./WhatWeFight.module.css";

type CardStyle = CSSProperties & {
  "--rotate"?: string;
  "--bg"?: string;
  "--z"?: number;
};

const CARDS = [
  {
    title: "Employment Background Check Errors",
    description:
      "Expunged records that won't go away, wrong criminal charges, or someone else's history can cost you jobs. Under the Fair Credit Reporting Act, accuracy is required. We make sure these errors get fixed.",
    icon: "/icons/icon-employment.svg",
  },
  {
    title: "Tenant Screening Mistakes",
    description:
      "Eviction errors, wrong criminal records, or someone else's rental history can get you denied or hit with higher deposits. Under the Fair Credit Reporting Act, screening companies must report accurately. We clear your name and recover what their errors cost you.",
    icon: "/icons/icon-tenant-screening.svg",
  },
  {
    title: "Credit Reporting Errors",
    description:
      "Accounts that aren't yours, incorrect balances, duplicate debts, or being marked deceased when you're alive can block loans, mortgages, and fair rates. We enforce the Fair Credit Reporting Act and pursue every dollar you're owed.",
    icon: "/icons/icon-credit-reporting.svg",
  },
  {
    title: "Insurance Report Errors",
    description:
      "Accidents you weren't in, incorrect claims history, or wrong personal records can raise your premiums or cost you coverage. These errors get disputed, and we hold every reporting company accountable.",
    icon: "/icons/icon-insurance.svg",
  },
  {
    title: "Debt Collection Harassment",
    description:
      "Excessive calls, threats, and continued contact after you've proven the debt isn't yours are unlawful under the Fair Debt Collection Practices Act. This means you may be able to hold debt collectors accountable and get compensation.",
    icon: "/icons/icon-debt-collection.svg",
  },
];

const DEPTH_ROTATION = ["0deg", "2.91deg", "-5.43deg", "6.98deg", "-14.35deg"];
const DEPTH_BG = [
  "#ffffff",
  "rgba(255, 255, 255, 0.3)",
  "rgba(255, 255, 255, 0.3)",
  "rgba(255, 255, 255, 0.2)",
  "rgba(255, 255, 255, 0.3)",
];

// Match the two deal animations in WhatWeFight.module.css. Prev is the shorter of
// the pair: it only plays the inward leg, where next also travels back to the deck.
const DEAL_OUT_MS = 950;
const DEAL_IN_MS = 600;

export default function WhatWeFight() {
  const [activeIndex, setActiveIndex] = useState(0);
  // The card flying out to the left (next) or flying back in from it (prev).
  const [dealt, setDealt] = useState<{ index: number; dir: 1 | -1 } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(dir: 1 | -1) {
    if (dealt) return; // one card in flight at a time, as in the prototype

    const nextIndex = (activeIndex + dir + CARDS.length) % CARDS.length;
    // Going forward the outgoing card is dealt away; going back the incoming one flies in.
    setDealt({ index: dir === 1 ? activeIndex : nextIndex, dir });
    setActiveIndex(nextIndex);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setDealt(null),
      dir === 1 ? DEAL_OUT_MS : DEAL_IN_MS,
    );
  }

  return (
    <section
      id="what-we-fight"
      className={styles.section}
      aria-labelledby="what-we-fight-heading"
    >
      <h2 id="what-we-fight-heading" className={styles.heading}>
        What We Fight
      </h2>
      <p className={styles.intro}>
        We hold credit bureaus, background check companies, and debt collectors
        accountable under federal laws such as the Fair Credit Reporting Act (FCRA) and
        the Fair Debt Collection Practices Act (FDCPA), helping you get the job, home,
        loan, insurance, and compensation you deserve.
      </p>

      <div className={styles.deck}>
        {CARDS.map((card, index) => {
          const depth = (index - activeIndex + CARDS.length) % CARDS.length;
          const isActive = depth === 0;
          const isDealt = dealt?.index === index;

          const cardStyle: CardStyle = {
            "--rotate": DEPTH_ROTATION[depth],
            "--bg": DEPTH_BG[depth],
            "--z": CARDS.length - depth,
          };

          const dealClass = isDealt
            ? dealt.dir === 1
              ? styles.dealOut
              : styles.dealIn
            : "";

          return (
            <article
              key={card.title}
              className={`${styles.card} ${dealClass}`}
              aria-hidden={!isActive}
              style={cardStyle}
            >
              <div
                className={styles.cardContent}
                data-visible={isActive || isDealt}
              >
                <Image
                  src={card.icon}
                  alt=""
                  width={57}
                  height={57}
                  className={styles.icon}
                  aria-hidden="true"
                />
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
                <Image
                  src="/icons/card-progress-bar.svg"
                  alt=""
                  width={49}
                  height={9}
                  className={styles.progressBar}
                  aria-hidden="true"
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(-1)}
          aria-label="Previous practice area"
        >
          <Image src="/icons/carousel-arrow.svg" alt="" width={37} height={37} />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(1)}
          aria-label="Next practice area"
        >
          <Image src="/icons/carousel-arrow.svg" alt="" width={37} height={37} />
        </button>
      </div>
    </section>
  );
}
