"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./TrustGallery.module.css";

export default function TrustGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  /*
   * On mobile the row is a horizontal scroller that opens centred on the featured
   * card, which CSS can't express. This has to run inside rAF: mandatory scroll
   * snapping performs its own snap right after first layout, and setting
   * scrollLeft before that just gets overridden back to the start.
   * Desktop fits on screen, so the width check makes it a no-op there.
   */
  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return;

    const frame = requestAnimationFrame(() => {
      if (node.scrollWidth <= node.clientWidth) return;

      const featured = node.querySelector<HTMLElement>('[data-featured="true"]');
      if (!featured) return;

      node.scrollLeft =
        featured.offsetLeft + featured.offsetWidth / 2 - node.clientWidth / 2;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={styles.gallery} ref={galleryRef}>
      <div className={`${styles.item} ${styles.photoShort}`}>
        <Image
          src="/images/hero-meeting.jpg"
          alt="Consumer Attorneys team member presenting to clients"
          fill
          sizes="240px"
          className={styles.photo}
        />
      </div>

      <div className={`${styles.item} ${styles.statCard} ${styles.statCardGlobe}`}>
        <Image
          src="/images/hero-globe.jpg"
          alt=""
          fill
          sizes="200px"
          className={`${styles.photo} ${styles.globe}`}
          aria-hidden="true"
        />
        <div className={styles.statCardOverlay} />
        <div className={styles.statCardContent}>
          <span className={styles.statNumber}>10,000+</span>
          <span className={styles.statLabel}>Nationwide clients</span>
        </div>
      </div>

      {/* The card the mobile scroller opens on — see centreOnFeatured. */}
      <div className={`${styles.item} ${styles.photoTall}`} data-featured="true">
        <Image
          src="/images/hero-street-walk.jpg"
          alt="Consumer Attorneys legal team"
          fill
          sizes="200px"
          className={styles.photo}
        />
      </div>

      <div className={`${styles.item} ${styles.statCard} ${styles.statCardMoney}`}>
        <div className={styles.moneyBars} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.statCardContent}>
          <span className={styles.statNumber}>$100M+</span>
          <span className={styles.statLabel}>Recovered for clients</span>
        </div>
      </div>

      <div className={`${styles.item} ${styles.photoTall}`}>
        <Image
          src="/images/hero-team-portrait.jpg"
          alt="Consumer Attorneys legal team portrait"
          fill
          sizes="200px"
          className={styles.photo}
        />
      </div>
    </div>
  );
}
