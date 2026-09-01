"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import styles from "./MeetTheTeam.module.css";

type PortraitStyle = CSSProperties & {
  "--photo-left"?: string;
  "--photo-top"?: string;
  "--photo-width"?: string;
  "--photo-height"?: string;
};

/*
 * Each portrait is a cutout clipped to the green circle. The offsets come straight
 * from the design, expressed against the 340px circle so they scale with it.
 */
const TEAM = [
  {
    name: "Emanuel Kataev",
    role: "General Counsel",
    photo: "/images/team/emanuel-kataev.png",
    raised: false,
    frame: { left: "0.29%", top: "3.53%", width: "99.4%", height: "99.4%" },
  },
  {
    name: "Daniel Cohen",
    role: "Founder & CEO",
    photo: "/images/team/daniel-cohen-2.png",
    raised: true,
    /*
     * This crop is near-square already (340x327), unlike the others' vertical
     * crops, so a plain fill covers the circle with almost no zoom — `cover` +
     * `object-position: bottom` (set in the CSS) handles the ~4% excess width.
     */
    frame: { left: "0%", top: "0%", width: "100%", height: "100%" },
  },
  {
    name: "Moshe Boroosan",
    role: "Managing Partner",
    photo: "/images/team/moshe-boroosan.png",
    raised: false,
    frame: { left: "3.82%", top: "0%", width: "92.6%", height: "129.4%" },
  },
];

/*
 * Daniel Cohen is the centre of the desktop row, and the mobile carousel opens on
 * him too — derived from the same `raised` flag rather than a hard-coded index.
 */
const DEFAULT_INDEX = Math.max(
  TEAM.findIndex((member) => member.raised),
  0,
);

export default function MeetTheTeam() {
  // Only drives the mobile carousel; the desktop row shows all three at once.
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);

  const goTo = (delta: number) =>
    setActiveIndex((current) =>
      Math.min(Math.max(current + delta, 0), TEAM.length - 1),
    );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Meet the team</h2>
      <p className={styles.intro}>
        We are real attorneys who fight for people every single day.
        <br />
        Federal law is on your side. We&apos;re here to make sure you can use it.
      </p>

      <ul
        className={styles.team}
        style={{ "--active": activeIndex } as CSSProperties}
      >
        {TEAM.map((member, index) => (
          <li
            key={member.name}
            className={styles.member}
            data-raised={member.raised}
            data-active={index === activeIndex}
          >
            <div className={styles.portrait}>
              <div className={styles.shade} aria-hidden="true" />
              <Image
                src={member.photo}
                alt={member.name}
                width={340}
                height={443}
                className={styles.photo}
                style={
                  {
                    "--photo-left": member.frame.left,
                    "--photo-top": member.frame.top,
                    "--photo-width": member.frame.width,
                    "--photo-height": member.frame.height,
                  } as PortraitStyle
                }
              />
            </div>
            <p className={styles.name}>{member.name}</p>
            <p className={styles.role}>{member.role}</p>
          </li>
        ))}
      </ul>

      {/* Mobile only — the desktop row needs no paging. */}
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous team member"
        >
          <Image src="/icons/cta-arrow-lg.svg" alt="" width={38} height={38} />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(1)}
          disabled={activeIndex === TEAM.length - 1}
          aria-label="Next team member"
        >
          <Image src="/icons/cta-arrow-lg.svg" alt="" width={38} height={38} />
        </button>
      </div>

      <a href="#start-your-case" className={styles.cta}>
        <span>Speak to our team</span>
        <Image
          src="/icons/cta-arrow-lg.svg"
          alt=""
          width={38}
          height={38}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
