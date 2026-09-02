"use client";

import { useState } from "react";
import styles from "./LeadForm.module.css";

const ERROR_TYPES = [
  "Credit report error",
  "Background check mix-up",
  "Tenant screening mistake",
  "Insurance report error",
  "Debt collector harassment",
  "Other",
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="start-your-case"
      className={styles.section}
      aria-labelledby="start-your-case-heading"
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="start-your-case-heading" className={styles.heading}>
            Start Your Case
          </h2>
          <p className={styles.subcopy}>
            Tell us what happened.
            <br />A member of our team will reach out within one business day.
          </p>
        </div>

        {submitted ? (
          <p className={styles.confirmation} role="status">
            Tell us what happened. A member of our team will reach out within one business day.
          </p>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            aria-label="Start your case"
          >
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.srOnly}>Full name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.srOnly}>Email address</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.srOnly}>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Phone number"
                  required
                />
              </label>
            </div>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.srOnly}>Which type of error?</span>
                <select name="errorType" defaultValue="" required>
                  <option value="" disabled>
                    Which type of error?
                  </option>
                  {ERROR_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.srOnly}>Briefly describe your situation</span>
                {/* One line on desktop; the design opens this up on mobile. */}
                <textarea
                  name="situation"
                  rows={1}
                  placeholder="Briefly describe your situation"
                />
              </label>
              <button type="submit" className={styles.submit}>
                <span className={styles.submitDesktop}>Submit</span>
                <span className={styles.submitMobile}>Send message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
