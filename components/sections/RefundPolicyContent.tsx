import Link from "next/link";

const effectiveDate = "August 6, 2026";

const sections = [
  { id: "why-not-refundable", label: "1. Why Most Fees Aren't Refundable" },
  { id: "when-refund-applies", label: "2. When a Refund May Apply" },
  { id: "not-covered", label: "3. What Isn't Covered" },
  { id: "cancellation", label: "4. Cancellation Terms" },
  { id: "how-to-request", label: "5. How to Request a Refund" },
  { id: "disputes", label: "6. Disputes" },
  { id: "policy-changes", label: "7. Changes to This Policy" },
];

export default function RefundPolicyContent() {
  return (
    <section className="bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-24">
      <div className="max-w-3xl mx-auto">
        <span className="block font-serif italic text-lg text-teal mb-3">Legal</span>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink mb-4">
          Refund Policy
        </h1>
        <p className="text-sm text-ink/50 mb-10">
          Effective date: {effectiveDate} · MediShields RCM
        </p>

        <p className="text-base text-ink/70 leading-relaxed mb-10">
          MediShields provides ongoing, service-based revenue cycle management, including
          medical billing, coding, credentialing, denial management, A/R follow-up, and
          reporting. Because these are professional services delivered continuously rather than
          a one-time product, our refund policy works differently than a retail return policy.
          This page explains, in plain terms, when a refund applies, when it doesn&rsquo;t, and
          how to request one.
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
          {/* 1. Why Not Refundable */}
          <section id="why-not-refundable" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">
              1. Why Most Fees Aren&rsquo;t Refundable Once Work Begins
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              When MediShields is engaged, our team starts working immediately: verifying
              eligibility, submitting claims, following up on payer responses, appealing
              denials, or completing credentialing paperwork. That work has real cost and real
              time attached to it the moment it&rsquo;s performed. For that reason, fees tied to
              work already completed, claims already submitted, coding already delivered, or
              credentialing steps already filed, are not refundable, regardless of the eventual
              outcome of a claim or payer decision.
            </p>
            <p className="text-sm text-ink/70 leading-relaxed">
              This is standard across the medical billing industry and it protects both sides:
              it keeps our pricing honest and predictable, and it means we&rsquo;re not
              incentivized to slow-walk work while a refund request is pending.
            </p>
          </section>

          {/* 2. When a Refund May Apply */}
          <section id="when-refund-applies" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">2. When a Refund May Apply</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              A refund, in full or in part, will be considered in these situations:
            </p>
            <ul className="space-y-2.5 text-sm text-ink/70">
              <li>
                <strong className="text-ink">Cancellation before work starts.</strong> If you
                cancel in writing before any billing, coding, or credentialing work has begun on
                your account for the applicable billing cycle, fees paid for that cycle are
                refunded in full.
              </li>
              <li>
                <strong className="text-ink">Billing error on our part.</strong> If you were
                charged incorrectly, double-billed, or billed for a service outside your signed
                agreement, we will correct the charge and refund the difference.
              </li>
              <li>
                <strong className="text-ink">Documented service failure.</strong> If MediShields
                fails to meet a specific, written service-level commitment in your agreement
                (for example, a defined claim submission timeline) and that failure is verified
                on our end, a partial refund or service credit may apply for the affected
                period.
              </li>
              <li>
                <strong className="text-ink">Overpayment.</strong> If you were invoiced and paid
                more than what your agreement calls for, the overage is refunded.
              </li>
            </ul>
          </section>

          {/* 3. What Isn't Covered */}
          <section id="not-covered" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">3. What Isn&rsquo;t Covered</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              To set expectations clearly, refunds do not apply to:
            </p>
            <ul className="space-y-2.5 text-sm text-ink/70">
              <li>
                Claims that are denied, underpaid, or delayed by a payer. Payer decisions are
                outside MediShields&rsquo; control and are not, by themselves, grounds for a
                refund; they are, however, exactly what our denial management and appeals
                process exists to address.
              </li>
              <li>
                Work already performed, including claims submitted, codes assigned, appeals
                filed, or credentialing applications sent to a payer.
              </li>
              <li>
                Third-party costs already incurred on your behalf, such as clearinghouse fees,
                payer application fees, or credentialing fees paid directly to a payer or
                licensing body.
              </li>
              <li>
                Dissatisfaction with reimbursement amounts that reflect accurate coding and
                legitimate payer contract rates, rather than an error by MediShields.
              </li>
              <li>
                Services cancelled mid-cycle after work has already started for that cycle; fees
                for that cycle are prorated only where the signed agreement specifically
                provides for proration.
              </li>
            </ul>
          </section>

          {/* 4. Cancellation Terms */}
          <section id="cancellation" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">4. Cancellation Terms</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-4">
              Either party may cancel services with 30 days&rsquo; written notice, or as
              otherwise specified in your signed service agreement. During the notice period,
              MediShields continues normal billing operations on the account, and standard fees
              apply for that period. Upon final termination, MediShields will:
            </p>
            <ul className="space-y-2 text-sm text-ink/70">
              <li>Complete or hand off any claims in progress, per your instruction</li>
              <li>Return or securely transfer patient and practice data relevant to your account</li>
              <li>
                Provide a final reconciliation report showing outstanding claims, A/R status,
                and any fees due or owed
              </li>
            </ul>
          </section>

          {/* 5. How to Request a Refund */}
          <section id="how-to-request" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">5. How to Request a Refund</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-ink/70 mb-4">
              <li>
                Email{" "}
                <a href="mailto:billing@medishields.com" className="text-teal hover:text-teal-dark transition-colors">
                  billing@medishields.com
                </a>{" "}
                or contact your dedicated account manager directly.
              </li>
              <li>
                Include your account/contract reference, the billing period in question, and the
                reason for the request.
              </li>
              <li>
                Requests should be submitted within 30 days of the invoice date in question.
                Requests made after 30 days will still be reviewed but may be harder to verify
                against that period&rsquo;s records.
              </li>
            </ol>
            <p className="text-sm text-ink/70 leading-relaxed">
              We aim to acknowledge every refund request within 2 business days and issue a
              decision within 10 business days. Approved refunds are returned via the original
              payment method, or applied as a credit toward a future invoice if the client
              prefers.
            </p>
          </section>

          {/* 6. Disputes */}
          <section id="disputes" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">6. Disputes</h2>
            <p className="text-sm text-ink/70 leading-relaxed">
              If you disagree with a refund decision, you can escalate the request in writing to
              your account manager&rsquo;s supervisor, who will review the account history and
              respond within 10 business days. We would rather resolve a billing disagreement
              directly with you than have it become a bigger problem, so don&rsquo;t hesitate to
              push back if something looks wrong.
            </p>
          </section>

          {/* 7. Changes to This Policy */}
          <section id="policy-changes" className="scroll-mt-28">
            <h2 className="font-display text-2xl text-ink mb-4">7. Changes to This Policy</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-6">
              MediShields may update this Refund Policy from time to time to reflect changes in
              our services or standard industry practice. Clients under an active signed
              agreement will be notified of material changes in writing at least 30 days before
              they take effect. The version in effect on the date of your invoice governs that
              invoice.
            </p>

            <div className="rounded-2xl bg-white border border-ink/8 p-6 text-sm text-ink/70 leading-relaxed">
              <strong className="text-ink block mb-1">Questions?</strong>
              Reach out anytime:{" "}
              <a href="mailto:billing@medishields.com" className="text-teal hover:text-teal-dark transition-colors">
                billing@medishields.com
              </a>{" "}
              or{" "}
              <a href="tel:+17867676696" className="text-teal hover:text-teal-dark transition-colors">
                (786) 767-6696
              </a>
              . If something about an invoice doesn&rsquo;t look right, tell us. Most of the
              time it&rsquo;s a two-minute fix, not a fight.
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
