/**
 * Privacy Policy and Terms & Conditions copy, supplied by the product owner (light grammar fixes, UK spelling).
 * Legal pages are the one place network names appear: the YouTube API terms require these disclosures.
 */
import { legalNav } from "@/content/navigation"

export type Inline = string | { href: string; label: string; external?: boolean }
export type LegalBlock = { p: Inline[] } | { list: Inline[][] } | { term: string; p: Inline[] }
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] }
export type LegalDoc = {
  key: "privacy" | "terms"
  title: string
  href: string
  meta: { title: string; description: string }
  lead: string
  highlights?: string[]
  sections: LegalSection[]
}

const googlePrivacy: Inline = { href: "https://www.google.com/policies/privacy", label: "google.com/policies/privacy", external: true }
const googleRevoke: Inline = {
  href: "https://security.google.com/settings/security/permissions",
  label: "Google security settings page",
  external: true,
}
const supportEmail: Inline = { href: "mailto:support@vinci360.com", label: "support@vinci360.com" }

/** Shared YouTube API Services disclosure (both documents). */
const youtubeApi = (intro: string): Inline[] => [
  `${intro} We use YouTube API Services (i.e. data from YouTube), governed by the Google Privacy Policy available at `,
  googlePrivacy,
  ", and other third-party API services. If you give us access to your YouTube account, you have the right to revoke that access at any time via the ",
  googleRevoke,
  ".",
]

export const legalUi = {
  switchLabel: "Legal documents",
  switch: legalNav,
  breadcrumbHome: "Home",
  toc: "On this page",
  updated: "Last updated:",
  updatedValue: "[Date: to be confirmed]",
  highlightsTitle: "In short",
  newTab: "(opens in a new tab)",
  contact: { title: "Questions about this document?", text: "Email us at ", email: supportEmail },
} as const

export const privacyPolicy: LegalDoc = {
  key: "privacy",
  title: "Privacy Policy",
  href: "/privacy-policy",
  meta: {
    title: "Privacy Policy",
    description:
      "How vinci360° by MSRcosmos collects, uses, shares, protects and retains your personal information, and how to contact us about your data or ask us to delete it.",
  },
  lead: "This policy outlines the information we collect from you, and what we do with it.",
  highlights: [
    "We never ask you for personal information unless we truly need it.",
    "We never share your personal information with anyone except to provide you with services and products, to comply with the law, or to protect our rights.",
    "We never store personal information unless it is required to operate our services, to provide you with products, to comply with the law or to protect our rights.",
    "We will use the personal information you provide in accordance with this Privacy Policy.",
  ],
  sections: [
    {
      id: "api-services",
      title: "API services",
      blocks: [
        { p: youtubeApi("We also use third-party API services from which the Software may retrieve information.") },
        {
          p: [
            "The website might store, access or collect (or allow third parties to do so) information directly or indirectly on or from users’ devices, including by placing, accessing or recognising cookies or similar technology on users’ devices or browsers.",
          ],
        },
      ],
    },
    {
      id: "data",
      title: "1. Data we collect and how we use it",
      blocks: [
        {
          term: "Data collection and use",
          p: [
            "We collect user data when you interact with our website or use our services. This data may include personal information such as your name, email address, phone number and other information that you provide to us. We use this data to provide and improve our services, and to communicate with you about our products and services. We may also use your data for research and analysis to improve our services.",
          ],
        },
        {
          term: "Data sharing",
          p: [
            "We do not share your data with third parties, except as necessary to provide our services to you or to comply with legal obligations. We may share data with service providers who help us provide our services, such as hosting providers and payment processors. We require these service providers to comply with applicable privacy laws and regulations.",
          ],
        },
        {
          term: "Data security",
          p: [
            "We take reasonable measures to protect user data from unauthorised access, disclosure, alteration or destruction. We use industry-standard encryption technologies and secure servers to store user data.",
          ],
        },
        {
          term: "Data deletion",
          p: [
            "If you would like us to delete your data, please contact us using the details in section 7. We will respond to your request within a reasonable time and will delete your data as required by applicable law.",
          ],
        },
        {
          term: "Data storage and retention",
          p: [
            "We keep your personal information for as long as necessary to fulfil your requests or the purposes for which it was obtained. The criteria used to determine our retention periods include (i) for as long as we have an ongoing relationship with a particular website visitor or potential customer, (ii) as required by a legal obligation to which we are subject, and (iii) as necessary to comply with legal obligations.",
          ],
        },
      ],
    },
    {
      id: "websites",
      title: "2. Websites",
      blocks: [
        {
          p: [
            "When you use certain parts of our websites or register for a free account, we may ask for personal information such as your full name, email address, mobile number and password.",
          ],
        },
      ],
    },
    {
      id: "general",
      title: "3. General",
      blocks: [{ p: ["If you contact us and provide us with information, we may keep a record of that correspondence and information."] }],
    },
    {
      id: "use",
      title: "4. What do we do with the information we collect?",
      blocks: [
        { p: ["We may use your information in the following ways:"] },
        {
          list: [
            ["To authenticate access to certain features of our websites."],
            ["To contact you, respond to enquiries or send you notices about our websites or the provision of services."],
            ["To provide services and products, process payments and authenticate access (where required)."],
            ["To analyse the performance or suitability of products or services."],
            ["To contact you if your actions breach your agreement with us (if any)."],
            ["To fix errors and analyse trends."],
            ["To study how anonymous users interact with our websites and services."],
            ["To market our products or services to you."],
          ],
        },
        {
          p: [
            "Unless you have told us otherwise, we may occasionally email you about new features, to ask for feedback, or simply to keep you up to date with what’s going on. We keep this type of communication to a minimum. If you no longer wish to receive these emails, follow the unsubscribe instructions in any of them or contact us using the details in section 7.",
          ],
        },
      ],
    },
    {
      id: "disclosure",
      title: "5. When do we disclose your personal data to third parties?",
      blocks: [
        {
          p: [
            "We may disclose your personal data when required to do so by law or in connection with any legal proceedings or prospective legal proceedings, in order to establish, exercise or defend our legal rights, to protect your safety or the safety of others, to investigate fraud, or to respond to a valid governmental request.",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "6. Changes to this Privacy Policy",
      blocks: [
        {
          p: [
            "This Privacy Policy may be amended from time to time. Use of the information collected is subject to the Privacy Policy in effect at the time the information is used. Users are bound by any changes to the Privacy Policy when they use the services after notice of those changes has been provided.",
          ],
        },
      ],
    },
    {
      id: "questions",
      title: "7. Questions or concerns",
      blocks: [{ p: ["If you have any questions or concerns about this Privacy Policy or your data, email us at ", supportEmail, "."] }],
    },
    {
      id: "term",
      title: "8. Term",
      blocks: [{ p: ["This Software License Agreement shall be valid for the duration for which the Software is subscribed to by the Client via the Marketplace."] }],
    },
  ],
}

export const termsAndConditions: LegalDoc = {
  key: "terms",
  title: "Terms & Conditions",
  href: "/terms",
  meta: {
    title: "Terms & Conditions",
    description:
      "The terms that apply when you use vinci360° by MSRcosmos, including confidentiality, third-party platforms and API services, data availability and amendments.",
  },
  lead: "By using vinci360° you agree to comply with and be bound by the following Terms of Use Agreement. Please review these terms carefully. If you do not agree to them, you should not use the Software.",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of these terms",
      blocks: [
        {
          p: [
            "You agree to the terms and conditions outlined in this Terms of Use Agreement with respect to the Software. This Agreement constitutes the entire and only agreement between us and you, and supersedes all prior or contemporaneous agreements, representations, warranties and understandings with respect to the Software and the subject matter of this Agreement.",
          ],
        },
        {
          p: [
            "This Agreement may be amended from time to time. The latest Agreement will be posted on the website, and you should review it regularly. Your continued use of the Software after changes to this Agreement are posted means you accept those changes.",
          ],
        },
      ],
    },
    {
      id: "confidentiality",
      title: "2. Confidentiality",
      blocks: [
        {
          p: [
            "The Client agrees to keep confidential all trade secrets and other information that is identified as proprietary or confidential, or that the circumstances around its disclosure indicate should be treated as confidential, and to make no use of that information unless permitted under this Agreement.",
          ],
        },
      ],
    },
    {
      id: "third-party-platforms",
      title: "3. Third-party platforms",
      blocks: [
        {
          term: "Definition",
          p: [
            "A Third-Party Platform means any third-party website, including but not limited to social media platforms (such as Twitter, Facebook and Instagram) and online media platforms (such as news websites, blogs and forums), from which we may retrieve information as part of a search made via the Software. The list of Third-Party Platforms available with the Software may be amended from time to time without notice to the Customer. You further agree to be bound by the terms and conditions of all Third-Party Platforms made available through the Services.",
          ],
        },
        {
          term: "API services",
          p: youtubeApi("vinci360° uses the YouTube, Facebook and Instagram API Services, from which the Software may retrieve information."),
        },
        { p: ["Other important links:"] },
        {
          list: [
            [{ href: "https://www.youtube.com/t/terms", label: "YouTube Terms of Service", external: true }],
            [{ href: "https://www.facebook.com/terms.php", label: "Facebook Terms and Conditions", external: true }],
          ],
        },
        { p: ["By using vinci360°, you agree to be bound by all such Terms of Service."] },
        {
          term: "Lack of guarantees",
          p: [
            "Because the Software provides information from Third-Party Platforms, you understand and acknowledge that the Services depend on the availability and completeness of the data provided by Third-Party Platforms and on the availability of the Third-Party Platforms themselves. vinci360° cannot and does not guarantee the availability, completeness or accuracy of any such data or Third-Party Platform.",
          ],
        },
        {
          term: "Amendments",
          p: [
            "You also agree that the terms for receiving information from a Third-Party Platform depend on the terms and conditions of that Third-Party Platform agreed by us, which the Third-Party Platform can amend at any time on its own initiative. Such amendments may make it impossible, or significantly restrict the ability, to obtain information from that Third-Party Platform, which may affect the scope of the Services. This is beyond our control and we are not responsible for it.",
          ],
        },
      ],
    },
  ],
}
