"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { AnimationEvent, CSSProperties } from "react";
import styles from "./WhatWeFight.module.css";

type CardStyle = CSSProperties & {
  "--rotate"?: string;
  "--bg"?: string;
  "--z"?: number;
  /* Set only on the card in flight — see the deal keyframes. */
  "--land-rotate"?: string;
  "--lift-rotate"?: string;
  "--apex-rotate"?: string;
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

/*
 * Landing angles, in the order they are dealt out. Rotation is the one thing here that
 * belongs to the CARD rather than to its slot: a card is given an angle when it lands at
 * the bottom, keeps it the whole way up the fan, and straightens to 0deg only once it
 * reaches the front. Every card used to land on the same -14.35deg, which is what made
 * the deal read as mechanical.
 *
 * Seven entries, coprime with the five cards, so landings do not realign with the card
 * cycle for 35 deals. The last four values are today's fan, so `cursor === 0` reproduces
 * the original resting layout exactly.
 *
 * The four visible wedges are always a window of four consecutive entries, so the values
 * were picked to keep every one of the seven windows well spread: minimum separation
 * between any two wedges is 3.52deg (below roughly 2.5deg two wedges read as one doubled
 * edge), and every window straddles 0deg so the fan never leans entirely one way. The
 * largest magnitude is still -14.35deg, so nothing protrudes further than it does today
 * — that matters, because the deck already sits close under `.intro` and inside
 * `.page { overflow: clip }`.
 */
const LANDING_ANGLES = [-14.35, -10.75, -1.75, 10.5, 2.91, -5.43, 6.98];
const DEPTH_BG = [
  "#ffffff",
  "rgba(255, 255, 255, 0.3)",
  "rgba(255, 255, 255, 0.3)",
  "rgba(255, 255, 255, 0.2)",
  "rgba(255, 255, 255, 0.3)",
];

/*
 * The longer of the two deal animations (next travels out and back; prev is the
 * inward leg only, and shorter) — see the deal animations in
 * WhatWeFight.module.css. The flight is cleared on `animationend`; this timeout is
 * only the fallback for when no animation runs at all (reduced motion, or a tab
 * backgrounded before the animation starts), so it carries slack on purpose:
 * setTimeout measures from the click, the animation from the next paint.
 */
const DEAL_MS = 700;
const DEAL_FALLBACK_MS = DEAL_MS + 140;

// The slot each direction vacates while a card is in flight, held by the phantom.
const BACK_DEPTH = CARDS.length - 1;
const FRONT_DEPTH = 0;

/*
 * A card's angle is derivable from one number, so no per-card table is needed.
 *
 * `cursor` counts net deals. The most recent landing sits at the back (depth 4), the one
 * before it at depth 3, and so on, so the card at depth `d` landed `BACK_DEPTH - d` deals
 * ago and takes `LANDING_ANGLES[cursor - (BACK_DEPTH - d)]`.
 *
 * Two properties fall out of that, and both are requirements rather than happy accidents:
 *
 * - A card KEEPS its angle as it rises. At cursor k a card at depth 3 has ordinal k-1;
 *   one deal later it is at depth 2 with cursor k+1, ordinal (k+1)-(4-2) = k-1. Same
 *   ordinal, same angle. Only `--z` and `--bg` change as it moves up, which is also what
 *   keeps the background wedges from visibly re-rotating mid-transition.
 * - prev EXACTLY undoes next, because the angle is a pure function of the cursor rather
 *   than of any accumulated history.
 *
 * Floored modulo, so a cursor driven negative by prev still wraps correctly.
 */
function angleAt(depth: number, cursor: number) {
  if (depth === FRONT_DEPTH) return "0deg";
  const ordinal = cursor - (BACK_DEPTH - depth);
  const n = LANDING_ANGLES.length;
  return `${LANDING_ANGLES[((ordinal % n) + n) % n]}deg`;
}

/*
 * The apex of the deal arc: 2deg PAST the destination, away from upright, so the card
 * always swings a little beyond where it settles and eases back — the same shape whether
 * its angle is negative or positive.
 *
 * The overshoot has to follow the sign. Computing it in CSS as `angle - 2deg` reads as
 * "further out" only for the negative angles; for a positive one it pulls back toward 0
 * and the rotation visibly wobbles (out, back, out again) instead of running monotonically.
 */
function apexFor(angle: string) {
  const deg = parseFloat(angle);
  return `${(deg + (deg < 0 ? -2 : 2)).toFixed(2)}deg`;
}

export default function WhatWeFight() {
  const [activeIndex, setActiveIndex] = useState(0);
  /*
   * The card in flight: dealt away to the left (next) or flying in from it (prev).
   * `from` is the index whose copy the phantom shows when prev holds the front slot.
   */
  const [dealt, setDealt] = useState<{
    index: number;
    dir: 1 | -1;
    from: number;
  } | null>(null);
  /*
   * Net deals. Drives every non-front card's angle via `angleAt`; moves with the
   * direction so prev walks back through exactly the angles next walked forward through.
   */
  const [cursor, setCursor] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(dir: 1 | -1) {
    if (dealt) return; // one card in flight at a time, as in the prototype

    const nextIndex = (activeIndex + dir + CARDS.length) % CARDS.length;
    // Going forward the outgoing card is dealt away; going back the incoming one flies in.
    setDealt({
      index: dir === 1 ? activeIndex : nextIndex,
      dir,
      from: activeIndex,
    });
    setActiveIndex(nextIndex);
    setCursor((c) => c + dir);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDealt(null), DEAL_FALLBACK_MS);
  }

  /*
   * Animation events bubble, and the card's copy runs its own (shorter) fade, so this
   * must ignore anything that did not originate on the card element itself — a
   * bubbled `animationend` from `.cardContent` would otherwise cut the flight short
   * at ~a third of its length and snap the card to the back of the deck.
   */
  function endFlight(event: AnimationEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (timer.current) clearTimeout(timer.current);
    setDealt(null);
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
            "--rotate": angleAt(depth, cursor),
            "--bg": DEPTH_BG[depth],
            "--z": CARDS.length - depth,
          };

          /*
           * The keyframes cannot hardcode the landing angle any more, so the flying card
           * carries it. `cursor` has already moved with the click, so this card's resting
           * `--rotate` IS its destination — passing the same value keeps the landed state
           * and the resting state identical, which is what makes removing the class a
           * no-op.
           *
           * For prev the destination is the front (0deg), so what the keyframe needs
           * instead is where the card is lifting off FROM: the back-slot angle it held
           * before the click, one cursor step back.
           */
          if (isDealt) {
            if (dealt.dir === 1) {
              const land = angleAt(BACK_DEPTH, cursor);
              cardStyle["--land-rotate"] = land;
              cardStyle["--apex-rotate"] = apexFor(land);
            } else {
              const lift = angleAt(BACK_DEPTH, cursor + 1);
              cardStyle["--lift-rotate"] = lift;
              cardStyle["--apex-rotate"] = apexFor(lift);
            }
          }

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
              onAnimationEnd={isDealt ? endFlight : undefined}
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

        {/*
         * Phantom layer. Five cards fill five fan slots, so the moment one is in
         * flight the fan is a layer short — that missing layer was the bug: the
         * -14.35deg back wedge (the most visible peeking corner) vanished for the
         * whole flight. The phantom stands in for whichever slot the flight
         * vacates, so all five slots are occupied on every frame.
         *
         * next vacates the BACK slot: a blank translucent wedge is enough, and it
         * is indistinguishable from the real card it stands in for.
         * prev vacates the FRONT slot: that one has to be an opaque card carrying
         * the outgoing copy, or the centre of the deck reads as blank while the
         * incoming card is still on its way in.
         */}
        {dealt && (
          <article
            className={`${styles.card} ${styles.phantom} ${
              dealt.dir === 1 ? styles.phantomBack : styles.phantomFront
            }`}
            aria-hidden="true"
            style={
              {
                /*
                 * Must be the angle the flier is LANDING on, not some fixed back-slot
                 * value — the stand-in and the arriving card have to occupy the same
                 * pose for the hand-over to be a straight swap rather than a crossfade
                 * between two different wedges.
                 */
                "--rotate": angleAt(
                  dealt.dir === 1 ? BACK_DEPTH : FRONT_DEPTH,
                  cursor,
                ),
                "--bg": DEPTH_BG[dealt.dir === 1 ? BACK_DEPTH : FRONT_DEPTH],
                "--z":
                  CARDS.length - (dealt.dir === 1 ? BACK_DEPTH : FRONT_DEPTH),
              } as CardStyle
            }
          >
            {dealt.dir === -1 && (
              <div className={styles.cardContent} data-visible="true">
                <Image
                  src={CARDS[dealt.from].icon}
                  alt=""
                  width={57}
                  height={57}
                  className={styles.icon}
                  aria-hidden="true"
                />
                <h3 className={styles.cardTitle}>{CARDS[dealt.from].title}</h3>
                <p className={styles.cardDescription}>
                  {CARDS[dealt.from].description}
                </p>
                <Image
                  src="/icons/card-progress-bar.svg"
                  alt=""
                  width={49}
                  height={9}
                  className={styles.progressBar}
                  aria-hidden="true"
                />
              </div>
            )}
          </article>
        )}
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
