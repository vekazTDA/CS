"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Testimonials.module.css";

type Review = {
  name: string;
  source: string;
  body: string;
  avatar?: string;
  /** object-position for avatars whose subject sits off-centre in the source crop. */
  avatarPosition?: string;
  /** Fallback used when the design has a coloured initial instead of a photo. */
  initial?: string;
  initialColor?: string;
};

/*
 * Five columns, each with its own top offset — the staggered rhythm comes from the
 * design rather than from a measured masonry, so the cards can size to their content.
 */
const COLUMNS: { offset: number; reviews: Review[] }[] = [
  {
    offset: 120,
    reviews: [
      {
        name: "Shane R",
        source: "Google Reviews",
        avatar: "/images/avatars/shane-r.png",
        body: "Just received my notice of settlement offer and I am thrilled. I once thought I would never have a credit score again but with the help of Consumer Attorneys that is no longer the case. During this period I mainly worked with Yaear and he is amazing! I would recommend anyone needing representation to consider this company. Thank you again!",
      },
      {
        name: "Bridget M",
        source: "Google Reviews",
        avatar: "/images/avatars/bridget-m.png",
        avatarPosition: "50% 35%",
        body: "They put things into layman's terms & made the process as painless as possible, considering what brought me to them. I'd recommend them to others, for sure!",
      },
    ],
  },
  {
    offset: 0,
    reviews: [
      {
        name: "Amanda B",
        source: "Google Reviews",
        avatar: "/images/avatars/amanda-b.png",
        avatarPosition: "45% 42%",
        body: "I cannot thank Atid Malka enough for everything he did for me during one of the most stressful experiences of my life. I was wrongly declared deceased on my credit report, and it caused serious emotional stress, financial issues, and confusion. From the moment Atid took my case, he treated me with compassion, professionalism, and urgency.",
      },
      {
        name: "T Roberts",
        source: "Google Reviews",
        avatar: "/images/avatars/t-roberts.png",
        body: "I am incredibly grateful for Meir Rubinov and the outstanding legal support he provided me. From the very beginning, he was patient, understanding, and truly cooperative throughout the entire process. I was going through a very stressful and emotional time, and even when I felt overwhelmed, he guided me with calm reassurance and clarity every step of the way.",
      },
    ],
  },
  {
    offset: 78,
    reviews: [
      {
        name: "AZ LS",
        source: "Google Reviews",
        avatar: "/images/avatars/az-ls.png",
        body: "I highly recommend these attorneys. They worked hard to secure the best possible settlement for me and kept in constant communication throughout the entire process. Their professionalism, attention to detail, and commitment to my case were outstanding — and the best part is I didn't have to pay anything out of pocket.",
      },
      {
        name: "Austin",
        source: "Google Reviews",
        avatar: "/images/avatars/austin.png",
        body: "I cannot recommend this legal team highly enough for the exceptional work they did on my behalf. What initially felt like an overwhelming and frustrating situation turned into a smooth and successful resolution thanks entirely to their expertise, persistence, and professionalism.",
      },
    ],
  },
  {
    offset: 26,
    reviews: [
      {
        name: "Bryan R",
        source: "Google Reviews",
        avatar: "/images/avatars/bryan-r.png",
        body: "I came to Consumer Attorneys with what turned out to be a fairly complex case against several credit reporting agencies, and I genuinely couldn't be more satisfied with how everything was handled from start to finish.",
      },
      {
        name: "Josue G",
        source: "Google Reviews",
        avatar: "/images/avatars/josue-g.png",
        body: "I would like to thank the entire team at Consumer Attorneys PLLC—including the legal assistants (Mr. David, Victoria, Angela, and everyone else), the attorneys (Noah and David), and the entire staff. They did an absolutely excellent job on my case; my credit had been damaged, but now—thanks to their hard work—my credit is in very good standing. I am truly grateful to all of you. Thank you so much; everyone was incredibly kind. I recommend them 100%!",
      },
    ],
  },
  {
    offset: 125,
    reviews: [
      {
        name: "Shmudaddy Prod",
        source: "Google Reviews",
        initial: "S",
        initialColor: "#f07575",
        body: "I am incredibly grateful to Meir and David for their outstanding representation at Consumer Attorneys. From the very beginning, they were responsive, attentive, and genuinely committed to my case. They both invested significant time and effort into making sure every detail was handled carefully and strategically.",
      },
      {
        name: "Violet V",
        source: "@jennikolim",
        avatar: "/images/avatars/violet-v.png",
        body: "I must say I had an amazing experience with Consumer attorneys, they made the process smooth. They answered all my questions with grace and respect. The settlement was quick, straightforward, and the outcome was even better than I anticipated.",
      },
    ],
  },
];

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  return (
    <figure className={styles.card} data-active={active}>
      <div className={styles.person}>
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt=""
            width={42}
            height={42}
            className={styles.avatar}
            style={{ objectPosition: review.avatarPosition }}
            aria-hidden="true"
          />
        ) : (
          <span
            className={`${styles.avatar} ${styles.avatarInitial}`}
            style={{ background: review.initialColor }}
            aria-hidden="true"
          >
            {review.initial}
          </span>
        )}
        <figcaption className={styles.names}>
          <span className={styles.name}>{review.name}</span>
          <span className={styles.source}>{review.source}</span>
        </figcaption>
      </div>
      <blockquote className={styles.quote}>{review.body}</blockquote>
    </figure>
  );
}

/*
 * Reading order once the columns collapse on mobile. Used to give every card a
 * stable slide index, since the mobile track flattens the columns with
 * `display: contents` and the DOM order becomes the carousel order.
 */
const SLIDES = COLUMNS.flatMap((column) => column.reviews);

export default function Testimonials() {
  // Only drives the mobile carousel; the desktop masonry ignores it.
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (delta: number) =>
    setActiveIndex((current) =>
      Math.min(Math.max(current + delta, 0), SLIDES.length - 1),
    );

  return (
    <section id="testimonials" className={styles.section}>
      <h2 className={styles.heading}>
        Don&rsquo;t just take our
        <br />
        word for it
      </h2>

      <div
        className={styles.grid}
        style={{ "--active": activeIndex } as React.CSSProperties}
      >
        {COLUMNS.map((column, index) => (
          <div
            key={index}
            className={styles.column}
            style={{ "--offset": `${column.offset}px` } as React.CSSProperties}
          >
            {column.reviews.map((review) => (
              <ReviewCard
                key={review.name}
                review={review}
                active={SLIDES.indexOf(review) === activeIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile only — the desktop masonry shows everything at once. */}
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous review"
        >
          <Image src="/icons/cta-arrow-lg.svg" alt="" width={38} height={38} />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(1)}
          disabled={activeIndex === SLIDES.length - 1}
          aria-label="Next review"
        >
          <Image src="/icons/cta-arrow-lg.svg" alt="" width={38} height={38} />
        </button>
      </div>
    </section>
  );
}
