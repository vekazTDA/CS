import Image from "next/image";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header className={styles.nav}>
      <a href="/" className={styles.logo} aria-label="Consumer Attorneys home">
        <Image
          src="/icons/nav-logo.svg"
          alt="Consumer Attorneys"
          width={139}
          height={32}
          priority
        />
      </a>
      <a
        href="tel:+18667584530"
        className={styles.phoneButton}
        aria-label="Call Consumer Attorneys at (866) 758-4530"
      >
        <Image
          src="/icons/nav-phone.svg"
          alt=""
          width={21}
          height={21}
          aria-hidden="true"
        />
        <span>(866) 758-4530</span>
      </a>
    </header>
  );
}
