import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionIntro from "../Layout/SectionIntro";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do I pay to search for a place on Onukpa?",
    answer:
      "No. Searching and sharing your requirements is free. Our service fee applies only when a rental is successfully completed through Onukpa.",
  },
  {
    question: "Does Onukpa charge viewing fees?",
    answer:
      "No. We don’t charge viewing fees and we work with landlords and agents who respect renters on this point.",
  },
  {
    question: "Why are prices shown monthly?",
    answer:
      "Monthly estimates make it easy to compare options. Many Accra landlords still ask for 1–2 years advance — we explain the full cash picture before you commit.",
  },
  {
    question: "How does agent routing work?",
    answer:
      "We start with landlord-direct matches. When it helps you move faster, we also route to verified agents with relevant stock in your areas.",
  },
  {
    question: "How do landlords list on Onukpa?",
    answer:
      "Register via WhatsApp or the web, then use your secure link to add properties one at a time. Each listing is reviewed before it goes live.",
  },
  {
    question: "How do agents join Onukpa?",
    answer:
      "Message the Onukpa bot on WhatsApp, choose the agent path, and complete onboarding in chat. You’ll receive a secure link to submit listings when you’re approved.",
  },
  {
    question: "How does Onukpa make money?",
    answer:
      "Success-based fees on completed rentals: 5% on landlord-direct deals, and 10% total on agent-assisted rentals (7% agent, 3% Onukpa). No viewing fees.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="border-t border-stone-200/50 bg-surface-muted py-20 md:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          title="Frequently asked"
          subtitle="Straight answers — the same ones we give in chat."
        />

        <div className="space-y-2">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="animate-on-scroll overflow-hidden rounded-2xl border border-stone-200/90 bg-surface-muted/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                >
                  <span className="font-medium text-stone-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-stone-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-stone-200/80 px-5 pb-5 pt-0 text-sm leading-relaxed text-stone-600 md:px-6 md:pb-6">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
