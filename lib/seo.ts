export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://consumerattorneys.com"
).replace(/\/$/, "");

export const SITE_NAME = "Consumer Attorneys";
export const SITE_LEGAL_NAME = "Consumer Attorneys PLLC";

export const SITE_TITLE =
  "Consumer Attorneys | Nationwide FCRA & FDCPA Lawyers";

export const SITE_DESCRIPTION =
  "Nationwide consumer protection lawyers for FCRA and FDCPA cases. No out-of-pocket fees. We fight credit, background check, tenant screening, insurance, and debt errors.";

export const SITE_TAGLINE =
  "When you've been wronged, we fight to protect your rights.";

export const PHONE_DISPLAY = "(866) 758-4530";
export const PHONE_E164 = "+18667584530";
export const OFFICE_PHONE_DISPLAY = "(866) 953-5270";
export const OFFICE_PHONE_E164 = "+18669535270";
export const EMAIL = "info@consumerattorneys.com";

export const ADDRESS = {
  street: "68-29 Main Street",
  city: "Flushing",
  region: "NY",
  postalCode: "11367",
  country: "US",
  latitude: 40.7372,
  longitude: -73.8244,
} as const;

export const PRACTICE_AREAS = [
  {
    name: "Employment Background Check Errors",
    description:
      "Expunged records that won't go away, wrong criminal charges, or someone else's history can cost you jobs. Under the Fair Credit Reporting Act, accuracy is required.",
  },
  {
    name: "Tenant Screening Mistakes",
    description:
      "Eviction errors, wrong criminal records, or someone else's rental history can get you denied or hit with higher deposits. Screening companies must report accurately under the FCRA.",
  },
  {
    name: "Credit Reporting Errors",
    description:
      "Accounts that aren't yours, incorrect balances, duplicate debts, or being marked deceased can block loans, mortgages, and fair rates. We enforce the Fair Credit Reporting Act.",
  },
  {
    name: "Insurance Report Errors",
    description:
      "Accidents you weren't in, incorrect claims history, or wrong personal records can raise your premiums or cost you coverage.",
  },
  {
    name: "Debt Collection Harassment",
    description:
      "Excessive calls, threats, and continued contact after you've proven the debt isn't yours are unlawful under the Fair Debt Collection Practices Act.",
  },
] as const;

export const CASE_STEPS = [
  {
    name: "You Reach Out",
    text: "Free consultation. We listen, help you gather the right docs, and tell you if your rights were violated.",
  },
  {
    name: "We Build Your Case",
    text: "We use the specific facts of your situation to identify every violation under the law and build a legal strategy for recovery.",
  },
  {
    name: "We Fight",
    text: "We handle the disputes, demands, and lawsuits. You never talk to them again, and we fight to get you paid.",
  },
] as const;

export const ATTORNEYS = [
  { name: "Daniel Cohen", jobTitle: "Founder & CEO" },
  { name: "Moshe Boroosan", jobTitle: "Managing Partner" },
  { name: "Emanuel Kataev", jobTitle: "General Counsel" },
] as const;

export function jsonLdGraph() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;
  const pageId = `${SITE_URL}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "Attorney"],
        "@id": orgId,
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon`,
        image: `${SITE_URL}/opengraph-image`,
        description: SITE_DESCRIPTION,
        slogan: SITE_TAGLINE,
        email: EMAIL,
        telephone: [PHONE_E164, OFFICE_PHONE_E164],
        priceRange: "No out-of-pocket fees",
        currenciesAccepted: "USD",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: ADDRESS.street,
          addressLocality: ADDRESS.city,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.postalCode,
          addressCountry: ADDRESS.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: ADDRESS.latitude,
          longitude: ADDRESS.longitude,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE_E164,
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: ["English"],
          },
        ],
        knowsAbout: [
          "Fair Credit Reporting Act",
          "Fair Debt Collection Practices Act",
          "Credit report errors",
          "Background check errors",
          "Tenant screening mistakes",
          "Insurance report errors",
          "Debt collection harassment",
          "Consumer protection law",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Consumer protection practice areas",
          itemListElement: PRACTICE_AREAS.map((area) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: area.name,
              description: area.description,
              provider: { "@id": orgId },
              areaServed: "US",
            },
          })),
        },
        employee: ATTORNEYS.map((person) => ({
          "@type": "Attorney",
          name: person.name,
          jobTitle: person.jobTitle,
          worksFor: { "@id": orgId },
        })),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2"],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#how-it-works`,
        name: "How a Consumer Attorneys case works",
        description:
          "Free consultation, case building, and legal action with no out-of-pocket fees.",
        step: CASE_STEPS.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
          url: `${SITE_URL}/#how-it-works`,
        })),
      },
    ],
  };
}
