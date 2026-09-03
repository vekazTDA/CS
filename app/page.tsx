import Image from "next/image";
import Navigation from "@/components/Navigation/Navigation";
import Hero from "@/components/Hero/Hero";
import TrustGallery from "@/components/TrustGallery/TrustGallery";
import LeadForm from "@/components/LeadForm/LeadForm";
import WhatWeFight from "@/components/WhatWeFight/WhatWeFight";
import CtaBanner from "@/components/CtaBanner/CtaBanner";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Testimonials from "@/components/Testimonials/Testimonials";
import MeetTheTeam from "@/components/MeetTheTeam/MeetTheTeam";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowMid} aria-hidden="true" />

      <Navigation />
      <main id="main-content">
        <div className={styles.heroBand}>
          <Image
            src="/icons/CA-LP-Background.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.heroBandBackdrop}
            aria-hidden="true"
            priority
          />
          <Hero />
          <TrustGallery />
        </div>
        <LeadForm />

        <div className={styles.lightSection}>
          <WhatWeFight />
          <CtaBanner />
        </div>

        <HowItWorks />
        <Testimonials />

        <div className={styles.darkSection}>
          <MeetTheTeam />
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
