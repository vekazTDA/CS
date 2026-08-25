import Image from "next/image";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <Image
            src="/icons/cta-banner-graphic.svg"
            alt=""
            width={53}
            height={51}
            className={styles.graphic}
            aria-hidden="true"
          />
          <p className={styles.text}>
            If their reporting errors cost you money or opportunities, we fight for
            correction and compensation. You pay nothing upfront or out of pocket.
          </p>
        </div>

        <a href="#start-your-case" className={styles.button}>
          <span>Start the conversation</span>
          <Image
            src="/icons/cta-banner-arrow.svg"
            alt=""
            width={30}
            height={30}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
