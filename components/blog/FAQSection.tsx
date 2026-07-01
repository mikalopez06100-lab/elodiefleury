import Script from "next/script";
import type { BlogFaq } from "@/lib/blog.shared";
import type { Locale } from "@/i18n/routing";

type Props = {
  faqs: BlogFaq[];
  title: string;
  locale: Locale;
};

export default function FAQSection({ faqs, title }: Props) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-12 rounded-[10px] border border-line bg-cal-dark p-6 md:p-8">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="mb-6 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-olivo">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-lg border border-line bg-cal px-5 py-4"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-mar">
              <span className="text-[0.92rem] leading-snug">{faq.question}</span>
              <span className="shrink-0 text-lg text-terracota transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-tinta-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
