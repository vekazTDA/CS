import Image from "next/image";
import styles from "./SiteFooter.module.css";

const SOCIALS = [
  {
    name: "Instagram",
    icon: "/icons/social-instagram.svg",
    href: "https://www.instagram.com/theconsumerattorneys/",
  },
  { name: "LinkedIn", icon: "/icons/social-linkedin.svg", href: "https://www.linkedin.com/company/consumer-attorneys-plc" },
  { name: "TikTok", icon: "/icons/social-tiktok.svg", href: "https://www.tiktok.com/@consumerattorneys" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.lockup}>
          <div className={styles.wordmark}>
            <Image
              src="/icons/Group1000004437.png"
              alt="Consumer Attorneys"
              width={1485}
              height={103}
            />
          </div>
        </div>

        <div className={styles.panel}>
          <ul className={styles.socials}>
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={social.name}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Image src={social.icon} alt="" width={33} height={33} />
                </a>
              </li>
            ))}
          </ul>

          <address className={styles.address}>
            68-29 Main Street, Flushing, NY 11367
            <br />
            <a href="tel:+18669535270">(866) 953-5270</a> |{" "}
            <a href="mailto:info@consumerattorneys.com">
              info@consumerattorneys.com
            </a>
          </address>

          <p className={styles.prompt}>Ready to get things sorted?</p>

          <a href="#start-your-case" className={styles.contact}>
            <span>Contact us</span>
            <Image
              src="/icons/footer-arrow.svg"
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
            />
          </a>
        </div>

        <div className={styles.legal}>
          <ul className={styles.legalLinks}>
            <li>
              <a
                href="https://consumerattorneys.com/page/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="https://consumerattorneys.com/page/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>All Rights Reserved. Consumer Attorneys 2026</li>
          </ul>
          <p>Made by Digital Artistry</p>
        </div>
      </div>
    </footer>
  );
}
