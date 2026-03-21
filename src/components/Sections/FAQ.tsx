import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do I pay to search for a place on Onukpa?",
    answer:
      "No. You do not pay Onukpa to search or to share your requirements. Our service fee only applies when a rental is successfully completed through Onukpa.",
  },
  {
    question: "Does Onukpa charge viewing fees?",
    answer:
      "No. Onukpa does not charge viewing fees. We actively avoid viewing-fee behaviour and work with landlords and agents who respect renters.",
  },
  {
    question: "Why are prices shown monthly?",
    answer:
      "We show prices as monthly estimates so you can easily compare options. Many landlords in Accra still take 1–2 years advance, but we always explain the real payment structure clearly before you decide.",
  },
  {
    question: "How does agent routing work?",
    answer:
      "Onukpa first looks for direct landlord matches. When it helps you find a place faster, we also route your request to verified agents in your selected areas. You only get connected to agents who have relevant properties.",
  },
  {
    question: "How do landlords list on Onukpa?",
    answer:
      "Landlords can register via WhatsApp or the web, then receive a secure link to add properties one by one. Each property is reviewed by the Onukpa team before going live.",
  },
  {
    question: "How do agents join Onukpa?",
    answer:
      "Agents can apply via the agent registration form. We review your details, areas of operation and portfolio before approving you to receive verified renter leads.",
  },
  {
    question: "How does Onukpa make money?",
    answer:
      "Onukpa earns a small success-based fee on completed rentals – 5% on landlord-direct deals, and 10% total on agent-assisted rentals (7% to the agent, 3% to Onukpa). There are no viewing fees.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="md:text-lg text-base text-slate-600">
            Practical answers to the questions renters, landlords and agents ask
            most.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="animate-on-scroll border border-slate-200 rounded-2xl bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-slate-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 md:px-6 pb-4 text-base md:text-lg text-slate-700">
                    {item.answer}
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
