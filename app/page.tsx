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
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowMid} aria-hidden="true" />

      <Navigation />
      <Hero />
      <TrustGallery />
      <LeadForm />

      <div className={styles.lightSection}>
        <WhatWeFight />
        <CtaBanner />
      </div>

      {/* Eases the lavender panel back down to the dark page ground. */}
      <div className={styles.sectionFade} aria-hidden="true" />

      <HowItWorks />

      {/* ...and back up to the light testimonials panel. */}
      <div className={styles.sectionFadeUp} aria-hidden="true" />

      <Testimonials />

      {/* Final return to the dark ground, which the footer sits on. */}
      <div className={styles.sectionFade} aria-hidden="true" />

      <div className={styles.darkSection}>
        <MeetTheTeam />
        <SiteFooter />
      </div>
    </div>
  );
}
