import Link from "next/link";

const lastUpdated = "July 25, 2026";
const policyVersion = "2.0";

const sections = [
  { id: "applicable-laws", label: "1. Applicable Laws" },
  { id: "data-we-collect", label: "2. Data We Collect" },
  { id: "how-we-use-data", label: "3. How We Use Your Data" },
  { id: "data-protection", label: "4. Data Protection & Security" },
  { id: "data-sharing", label: "5. Data Sharing & Vendors" },
  { id: "your-rights", label: "6. Your Rights" },
  { id: "breach-notification", label: "7. Breach Notification" },
  { id: "data-retention", label: "8. Data Retention" },
  { id: "cookies", label: "9. Cookies & Tracking" },
  { id: "childrens-privacy", label: "10. Children's Privacy" },
  { id: "policy-changes", label: "11. Changes to This Policy" },
  { id: "contact", label: "12. Contact Us" },
];

/** Marks a claim that reflects standard practice for a HIPAA Business
 * Associate but hasn't been confirmed against MediShields' actual
 * implementation yet. See the "†" legend at the bottom of each section that
 * uses it. */
function UnconfirmedMark() {
  return (
    <sup className="text-amber font-semibold" aria-label="unconfirmed, see note below">
      †
    </sup>
  );
}

export default function PrivacyPolicyContent() {
  return (
    <section className="bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-24">
      <div className="max-w-3xl mx-auto">
        <span className="block font-serif italic text-lg text-teal mb-3">Legal</span>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-ink/50 mb-10">
          Effective date: {lastUpdated} · Version {policyVersion}
        </p>

        <p className="text-base text-ink/70 leading-relaxed mb-10">
          MediShields (&ldquo;MediShields,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) provides medical billing, coding, credentialing, virtual scribing, and
          revenue cycle management services to healthcare providers. This Privacy Policy explains
          how we collect, use, protect, and share information, including Protected Health
          Information (PHI), in the course of providing those services, and describes the rights
          available to patients, providers, and website visitors.
        </p>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="rounded-2xl bg-white border border-ink/8 p-6 mb-16">
          <h2 className="font-display text-base text-ink mb-4">On this page</h2>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <Link href={`#${s.id}`} className="text-teal hover:text-teal-dark transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-16">
          {/* 1. Applicable Laws */}
          <section id="applicable-laws" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">1. Applicable Laws</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              MediShields handles PHI and other personal data as a Business Associate under HIPAA
              and in compliance with the following laws and regulations, as applicable to the
              client, patient, or visitor whose data we process:
            </p>
            <ul className="space-y-2.5 text-sm text-ink/70">
              <li>
                <strong className="text-ink">HIPAA Privacy Rule</strong>: 45 CFR Part 160 and Part
                164, Subparts A and E
              </li>
              <li>
                <strong className="text-ink">HIPAA Security Rule</strong>: 45 CFR Part 164, Subpart
                C
              </li>
              <li>
                <strong className="text-ink">HITECH Act Breach Notification Rule</strong>: 45 CFR
                §§ 164.400–414
              </li>
              <li>
                <strong className="text-ink">General Data Protection Regulation (GDPR)</strong>:
                for clients or patients located in the European Union
              </li>
              <li>
                <strong className="text-ink">California Consumer Privacy Act (CCPA/CPRA)</strong>:
                for California residents
              </li>
              <li>
                <strong className="text-ink">State privacy laws</strong>: including Virginia
                (VCDPA), Colorado (CPA), Connecticut (CTDPA), and other applicable state statutes
              </li>
              <li>
                <strong className="text-ink">PCI DSS</strong>: for payment card data processed on
                behalf of clients
              </li>
            </ul>
          </section>

          {/* 2. Data We Collect */}
          <section id="data-we-collect" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">2. Data We Collect</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-6">
              We collect the categories of information below. Each category is processed under a
              specific legal basis, typically a Business Associate Agreement (contract) with the
              provider, a legal obligation (e.g., claims submission, compliance reporting), or your
              consent (e.g., website cookies).
            </p>
            <div className="space-y-5">
              {[
                {
                  title: "Protected Health Information (PHI)",
                  body: "Patient demographics, diagnosis and procedure codes, treatment records, insurance and claims data, and other health information received from or on behalf of our provider clients.",
                },
                {
                  title: "Provider information",
                  body: "Credentialing data, National Provider Identifier (NPI), tax ID, licensure, payer enrollment records, and practice information.",
                },
                {
                  title: "Technical data",
                  body: "IP address, browser type, device information, and website usage data collected via cookies and similar technologies.",
                },
                {
                  title: "Communication data",
                  body: "Correspondence with our support team, consultation requests, and account manager communications.",
                },
                {
                  title: "Financial data",
                  body: "Billing, payment, and reimbursement data processed on behalf of provider clients, including data handled under PCI DSS for payment processing.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-base text-ink mb-1">{item.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. How We Use Your Data */}
          <section id="how-we-use-data" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">3. How We Use Your Data</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">We use the data described above to:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-ink/70">
              <li>Submit and manage medical claims and billing on behalf of provider clients</li>
              <li>Complete provider credentialing and payer enrollment</li>
              <li>Maintain compliance with HIPAA, payer, and regulatory requirements</li>
              <li>Provide virtual medical scribing and documentation services</li>
              <li>Generate reporting and analytics dashboards for provider clients</li>
              <li>Respond to support requests and provide customer service</li>
              <li>Meet legal obligations, including responding to lawful requests from authorities</li>
              <li>Improve and secure our services, systems, and website</li>
            </ol>
            <p className="text-sm text-ink/70 leading-relaxed mt-5">
              <strong className="text-ink">We do NOT</strong> sell PHI or personal data, use it for
              advertising or marketing to patients, or use it for unrelated research or product
              development without explicit authorization.
            </p>
          </section>

          {/* 4. Data Protection & Security */}
          <section id="data-protection" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">4. Data Protection & Security</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              We maintain administrative, physical, and technical safeguards designed to protect
              PHI and personal data, including:
            </p>
            <ul className="space-y-2 text-sm text-ink/70">
              <li>
                <strong className="text-ink">Encryption</strong>: AES-256 encryption for PHI at
                rest, and TLS 1.2 or higher for data in transit
                <UnconfirmedMark />
              </li>
              <li>
                <strong className="text-ink">Access control</strong>: role-based access control
                and multi-factor authentication (MFA) required for all systems containing PHI
                <UnconfirmedMark />
              </li>
              <li>
                <strong className="text-ink">Monitoring</strong>: continuous system monitoring
                for unauthorized access or unusual activity
                <UnconfirmedMark />
              </li>
              <li>
                <strong className="text-ink">Security testing</strong>: regular vulnerability
                scans and periodic third-party penetration testing
                <UnconfirmedMark />
              </li>
              <li>Documented incident response procedures for suspected or confirmed security events</li>
              <li>
                Business Associate Agreements (BAAs) with all subcontractors and vendors who access
                PHI, per 45 CFR § 164.504(e)
              </li>
            </ul>
            <p className="text-xs text-ink/50 leading-relaxed mt-4">
              <sup className="text-amber font-semibold">†</sup> Reflects standard practice for a
              HIPAA Business Associate; not yet confirmed against MediShields&rsquo; actual
              implementation.
            </p>
          </section>

          {/* 5. Data Sharing & Vendors */}
          <section id="data-sharing" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">5. Data Sharing & Vendors</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              We share data only as necessary to deliver our services, and only with parties bound
              by a signed Business Associate Agreement or equivalent contractual data-protection
              terms. This includes:
            </p>
            <ul className="space-y-2 text-sm text-ink/70 mb-4">
              <li>Insurance companies and payers, for claims submission and processing</li>
              <li>EHR and practice management system vendors, for data integration</li>
              <li>Payment processors, for handling billing and reimbursement transactions</li>
              <li>Clearinghouses, for claims routing and validation</li>
              <li>Regulators and law enforcement, when legally required</li>
            </ul>
            <p className="text-sm text-ink/70 leading-relaxed">
              <strong className="text-ink">We do NOT sell data to marketers</strong> or any third
              party for advertising purposes.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section id="your-rights" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">6. Your Rights</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base text-ink mb-2">Under HIPAA</h3>
                <ul className="space-y-1.5 text-sm text-ink/70">
                  <li>Right to access your PHI</li>
                  <li>Right to request amendment of inaccurate PHI</li>
                  <li>Right to an accounting of disclosures</li>
                  <li>Right to receive notification in the event of a breach affecting your PHI</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base text-ink mb-2">Under CCPA/CPRA (California residents)</h3>
                <ul className="space-y-1.5 text-sm text-ink/70">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to request deletion of personal information</li>
                  <li>Right to opt out of the sale or sharing of personal information</li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base text-ink mb-2">Under GDPR (EU individuals)</h3>
                <ul className="space-y-1.5 text-sm text-ink/70">
                  <li>Right of access to your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure (&ldquo;right to be forgotten&rdquo;)</li>
                  <li>Right to data portability</li>
                  <li>Right to object to certain processing</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-ink/70 leading-relaxed mt-6">
              To submit a request under any of the rights above, contact our Privacy Officer using
              the details in Section 12. We will respond within 30 days for HIPAA and GDPR
              requests, and within 45 days for CCPA requests, as required by applicable law.
            </p>
          </section>

          {/* 7. Breach Notification */}
          <section id="breach-notification" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">7. Breach Notification</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              A breach is an impermissible use or disclosure of unsecured PHI that compromises its
              security or privacy. In the event of a breach, we follow this process:
            </p>
            <ol className="space-y-3 text-sm text-ink/70">
              <li>
                <strong className="text-ink">1. Discovery</strong>: the incident is identified and
                logged
              </li>
              <li>
                <strong className="text-ink">2. Investigation</strong>: scope, cause, and affected
                individuals are determined
              </li>
              <li>
                <strong className="text-ink">3. Notification</strong>: affected individuals and
                clients are notified, including what happened, what data was involved, what
                individuals should do, and our contact information
              </li>
              <li>
                <strong className="text-ink">4. Regulatory reporting</strong>: HHS Office for Civil
                Rights and applicable state regulators are notified as required
              </li>
              <li>
                <strong className="text-ink">5. Remediation</strong>: corrective actions are taken
                to prevent recurrence
              </li>
            </ol>
            <p className="text-sm text-ink/70 leading-relaxed mt-4">
              Notification is provided without unreasonable delay and no later than 60 days after
              discovery, as required by the HITECH Breach Notification Rule.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section id="data-retention" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">8. Data Retention</h2>
            <ul className="space-y-2 text-sm text-ink/70">
              <li>
                <strong className="text-ink">PHI:</strong> retained per applicable state medical
                records requirements, generally 6–10 years depending on the client&rsquo;s state
                of practice and patient age (minors&rsquo; records may be retained longer under
                state law)
                <UnconfirmedMark />
              </li>
              <li>
                <strong className="text-ink">Financial and billing records:</strong> retained for 7
                years
              </li>
              <li>
                <strong className="text-ink">Website cookies and technical data:</strong> retention
                varies by cookie type; see Section 9
              </li>
            </ul>
            <p className="text-sm text-ink/70 leading-relaxed mt-4">
              At the end of the applicable retention period, data is securely destroyed or
              de-identified in accordance with HIPAA disposal requirements.
            </p>
            <p className="text-xs text-ink/50 leading-relaxed mt-4">
              <sup className="text-amber font-semibold">†</sup> Reflects standard practice; exact
              retention period should be confirmed per client state requirements before
              publishing.
            </p>
          </section>

          {/* 9. Cookies */}
          <section id="cookies" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">9. Cookies & Tracking</h2>
            <p className="text-sm text-ink/70 leading-relaxed">
              Our website uses cookies and similar technologies to operate essential site
              functionality, remember preferences, and understand aggregate site usage. You can
              control cookies through your browser settings. We do not use cookies to track
              patients or PHI.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section id="childrens-privacy" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">10. Children&rsquo;s Privacy</h2>
            <p className="text-sm text-ink/70 leading-relaxed">
              Our website is not directed at children under 13, and we do not knowingly collect
              personal information from children through our website. PHI relating to minor
              patients is handled by our provider clients in accordance with HIPAA and applicable
              state law, and is processed by MediShields solely as a Business Associate on their
              behalf.
            </p>
          </section>

          {/* 11. Policy Changes */}
          <section id="policy-changes" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">11. Changes to This Policy</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-3">
              We may update this Privacy Policy periodically. Non-material changes (e.g., formatting,
              clarifications) take effect immediately. Material changes, such as new categories of
              data collected, new purposes of use, or new third-party sharing, will be posted with
              an updated effective date at least 30 days before taking effect.
            </p>
            <p className="text-sm text-ink/70 leading-relaxed">
              This policy is reviewed at least annually and whenever applicable laws change.
            </p>
          </section>

          {/* 12. Contact */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">12. Contact Us</h2>
            <div className="rounded-2xl bg-white border border-ink/8 p-6 space-y-4 text-sm text-ink/70">
              <div>
                <strong className="text-ink block mb-1">Privacy Officer</strong>
                <a href="mailto:compliance@medishields.com" className="text-teal hover:text-teal-dark transition-colors">
                  compliance@medishields.com
                </a>{" "}
                ·{" "}
                <a href="tel:+17867676696" className="text-teal hover:text-teal-dark transition-colors">
                  (786) 767-6696
                </a>{" "}
                · Response within 5 business days
              </div>
              <div>
                <strong className="text-ink block mb-1">Security incident reporting</strong>
                <a href="mailto:compliance@medishields.com" className="text-teal hover:text-teal-dark transition-colors">
                  compliance@medishields.com
                </a>{" "}
                · monitored 24/7
              </div>
              <div>
                <strong className="text-ink block mb-1">Mailing address</strong>
                261 N University Dr, Ste 500, Plantation, FL 33324, USA
              </div>
              <div>
                <strong className="text-ink block mb-1">Regulatory escalation</strong>
                If you believe your rights have not been respected, you may file a complaint with
                the U.S. Department of Health & Human Services Office for Civil Rights (HHS OCR),
                your state Attorney General, or the Federal Trade Commission (FTC).
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
