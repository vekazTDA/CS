"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./TrustGallery.module.css";

export default function TrustGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  /*
   * On mobile the row is a horizontal scroller that opens centred on the featured
   * card, which CSS can't express. The tricky part is *when*: on first paint the
   * track is often not at its final width yet, and the effect then sees
   * scrollWidth <= clientWidth and no-ops. A single requestAnimationFrame used to be
   * enough, but that is just a guess about layout order — adding one render-blocking
   * stylesheet to <head> was enough to break it. A ResizeObserver waits for the real
   * thing instead: the first callback where the track is actually overflowing.
   *
   * Assigning scrollLeft (rather than scrollIntoView) keeps this confined to the
   * scroller — scrollIntoView is free to scroll the whole page vertically to reveal
   * the card, which on a fresh load would jump the visitor past the hero.
   */
  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return;

    const featured = node.querySelector<HTMLElement>('[data-featured="true"]');
    if (!featured) return;

    let centred = false;
    const centre = () => {
      // Desktop lays the row out in full, so there is nothing to centre.
      if (centred || node.scrollWidth <= node.clientWidth) return;
      centred = true;
      node.scrollLeft =
        featured.offsetLeft + featured.offsetWidth / 2 - node.clientWidth / 2;
    };

    centre();
    const observer = new ResizeObserver(centre);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="results-heading">
      <h2 id="results-heading" className="srOnly">
        Nationwide results for consumer protection clients
      </h2>
      <div className={styles.gallery} ref={galleryRef}>
        <div className={`${styles.item} ${styles.photoShort}`}>
        <Image
          src="/images/team/GenLPImage1.png"
          alt="Consumer Attorneys team member presenting to clients"
          fill
          sizes="240px"
          className={styles.photo}
        />
      </div>

      <div className={`${styles.item} ${styles.statCard} ${styles.statCardGlobe}`}>
        {/*
          The globe needs its own box: it is sized wider than the card and sunk below
          its bottom edge, and `fill` writes width/height/inset as INLINE styles that a
          class cannot override. The wrapper carries the geometry and the circular clip
          that cuts away the source JPEG's white background; the image just fills it.
        */}
        <div className={styles.globeWrap} aria-hidden="true">
          <Image
            src="/images/hero-globe.jpg"
            alt=""
            fill
            sizes="240px"
            className={`${styles.photo} ${styles.globe}`}
          />
        </div>
        <div className={styles.statCardContent}>
          <span className={styles.statNumber}>10,000+</span>
          <span className={styles.statLabel}>Nationwide clients</span>
        </div>
      </div>

      {/* The card the mobile scroller opens on — see centreOnFeatured. */}
      <div className={`${styles.item} ${styles.photoWide}`} data-featured="true">
        <Image
          src="/images/team/GenLPImage2.png"
          alt="Consumer Attorneys legal team"
          fill
          sizes="239px"
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
          <span className={styles.statNumber}>$100MM+</span>
          <span className={styles.statLabel}>Recovered for clients</span>
        </div>
      </div>

      <div className={`${styles.item} ${styles.photoTall}`}>
        <Image
          src="/images/team/GenLPImage3.png"
          alt="Consumer Attorneys legal team portrait"
          fill
          sizes="200px"
          className={styles.photo}
        />
      </div>
      </div>
    </section>
  );
}
