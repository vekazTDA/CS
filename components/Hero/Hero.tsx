import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.tag}>
        <span>No out-of pocket fees</span>
        <Image src="/icons/hero-tag-arrow.svg" alt="" width={12} height={8} aria-hidden="true" />
      </div>

      <h1 id="hero-heading" className={styles.headline}>
        {/* The space matters: mobile hides the break and needs the words apart. */}
        When you&apos;ve been wronged,{" "}
        <br className={styles.headlineBreak} />
        we fight to protect <span className={styles.accent}>your rights</span>.
      </h1>

      <div className={styles.subcopy}>
        <p>
          We&rsquo;re a Nationwide Consumer Protection Law Firm. No out-of-pocket fees.
        </p>
        <p>
          A credit report error. A background check mix-up. A tenant screening mistake. An
          insurance report that got it wrong. A debt collector who overstepped. Corporate
          bullies don&rsquo;t stand a chance against us.
        </p>
      </div>

      <a href="#start-your-case" className={styles.cta}>
        <span>Get a free consultation</span>
        <Image
          src="/icons/cta-arrow-circle.svg"
          alt=""
          width={29}
          height={29}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
