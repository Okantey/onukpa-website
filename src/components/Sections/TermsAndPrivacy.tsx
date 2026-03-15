import { useState } from "react";
import {
  Shield,
  FileText,
  ChevronRight,
  Check,
  MessageCircle,
  Mail,
} from "lucide-react";

const TermsAndPrivacy = () => {
  const [activeSection, setActiveSection] = useState("terms");

  const sections = [
    { id: "terms", name: "Terms & Conditions", icon: FileText },
    { id: "privacy", name: "Privacy Policy", icon: Shield },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-10 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Legal Documents
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Terms & Privacy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understanding how we protect your data and serve you better
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-32">
                <h3 className="font-semibold text-slate-900 mb-4">Documents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-primary text-white shadow-lg"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-medium">{section.name}</span>
                      {activeSection === section.id && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </nav>

                {/* Contact Support */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Need Help?
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/+233245095569"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        WhatsApp Support
                      </span>
                    </a>
                    <a
                      href="mailto:support@onukpa.com"
                      className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Email Support</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                {/* Terms & Conditions */}
                {activeSection === "terms" && (
                  <div className="animate-fade-in">
                    <div className="flex items-center space-x-3 mb-8">
                      <FileText className="w-8 h-8 text-primary" />
                      <h2 className="text-3xl font-bold text-slate-900">
                        Terms & Conditions
                      </h2>
                    </div>

                    <div className="prose prose-slate max-w-none">
                      {/* Introduction */}
                      <section className="mb-8">
                        <h3 className="text-xl font-semibold text-slate-900 mb-4">
                          1. Introduction
                        </h3>
                        <p className="text-slate-700 mb-4">
                          Welcome to <strong>Onukpa</strong> ("we," "our," "us"). These Terms &
                          Conditions govern your use of our website, WhatsApp assistant and any
                          related services. By using Onukpa, you agree to these terms. If you do
                          not agree, please do not use the service.
                        </p>
                        <p className="text-slate-700">
                          Onukpa is a <strong>WhatsApp-first rental marketplace</strong> that
                          connects renters with landlords and agents for verified rooms,
                          apartments, hostels and commercial spaces in and around Accra. We are a
                          facilitator and do not become a party to the final tenancy agreement
                          between renter and landlord/agent.
                        </p>
                      </section>

                      {/* For Users */}
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
                          A. For Users
                        </h3>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              2. Eligibility
                            </h4>
                            <p className="text-slate-700">
                              Users must be at least 18 years old and capable of
                              entering into a binding contract.
                            </p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              3. Use of Service
                            </h4>
                            <ul className="text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                You may use Onukpa to find, inquire about, or
                                book verified listings.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                You must provide accurate details when
                                interacting with our platform or WhatsApp
                                assistant.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                You agree not to misuse Onukpa for fraudulent or
                                illegal activities.
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              4. Verification and Payments
                            </h4>
                            <p className="text-slate-700 mb-3">
                              Onukpa&apos;s goal is to remove unnecessary viewing fees and make
                              rental payments more transparent. In practice, this means:
                            </p>
                            <ul className="text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Onukpa does not charge viewing fees. You should not pay anyone
                                simply to view a property advertised through Onukpa.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Where applicable, Onukpa may charge a success-based service fee
                                after a rental is confirmed through our platform (for example, 5%
                                on landlord-direct rentals or 10% total on agent-assisted rentals,
                                with a share going to the agent). Any such fees will be communicated
                                clearly before you commit.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Unless we clearly state otherwise, rental deposits and rent are
                                paid directly between renter and landlord or agent. Always confirm
                                account details and keep proof of payment.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                We are not responsible for private, off-platform transactions
                                carried out without using our recommended verification or
                                communication channels.
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              5. User Responsibilities
                            </h4>
                            <ul className="text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Treat all agents and listings respectfully.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Report suspicious listings or behaviors
                                immediately via WhatsApp or our support email.
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              6. Termination
                            </h4>
                            <p className="text-slate-700">
                              We may suspend or terminate access for users who
                              abuse the system, provide false information, or
                              engage in scams.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* For Agents */}
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
                          B. For Agents
                        </h3>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              7. Registration
                            </h4>
                            <p className="text-slate-700">
                              Agents must register with valid identification,
                              contact details, and property ownership or
                              management proof.
                            </p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              8. Agent Responsibilities
                            </h4>
                            <ul className="text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Agents must post only verified listings they
                                legally manage or own.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Agents must not misrepresent property
                                conditions, prices, or availability.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                All communications with users should remain
                                professional and transparent.
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              9. Premium & Free Access
                            </h4>
                            <ul className="text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Free agents may receive limited daily leads or
                                requests.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Premium agents have access to increased or
                                unlimited verified leads.
                              </li>
                              <li className="flex items-start">
                                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                Subscription or premium fees are non-refundable
                                once services begin.
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              10. Removal or Suspension
                            </h4>
                            <p className="text-slate-700">
                              Agents found to be fraudulent, misleading, or
                              inactive may be removed or suspended from Onukpa's
                              platform.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* General Terms */}
                      <section>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
                          C. General Terms
                        </h3>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              11. Limitation of Liability
                            </h4>
                            <p className="text-slate-700">
                              Onukpa acts as a <strong>facilitator</strong> and
                              is not a direct party to any rental transaction.
                              We are not liable for losses resulting from
                              personal arrangements made outside the verified
                              Onukpa process.
                            </p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">
                              12. Modifications
                            </h4>
                            <p className="text-slate-700">
                              Onukpa may update these Terms & Conditions at any
                              time. Continued use of our services after updates
                              implies acceptance.
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}

                {/* Privacy Policy */}
                {activeSection === "privacy" && (
                  <div className="animate-fade-in">
                    <div className="flex items-center space-x-3 mb-8">
                      <Shield className="w-8 h-8 text-primary" />
                      <h2 className="text-3xl font-bold text-slate-900">
                        Privacy Policy
                      </h2>
                    </div>

                    <div className="prose prose-slate max-w-none">
                      <div className="space-y-8">
                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            1. Information We Collect
                          </h3>
                          <p className="text-slate-700 mb-4">
                            We only collect information needed to operate the Onukpa service,
                            connect renters with properties, and keep the platform safe:
                          </p>
                          <ul className="text-slate-700 space-y-2">
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              Names and contact details (such as phone numbers and email)
                              shared when you speak to Onukpa or fill a form
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              Basic location information and property details (for example,
                              areas you are interested in, listing descriptions or budgets)
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              Logs of interactions with our WhatsApp assistant (only for
                              quality, matching and security)
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              Optional documents or media you choose to submit for verification
                              (for example, Ghana Card details for suppliers)
                            </li>
                          </ul>
                        </section>

                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            2. How We Use Your Information
                          </h3>
                          <ul className="text-slate-700 space-y-2">
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              To connect users with verified agents or listings
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              To verify authenticity and maintain safety on the
                              platform
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              To improve our WhatsApp automation and service
                              delivery
                            </li>
                          </ul>
                        </section>

                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            3. Data Sharing
                          </h3>
                          <ul className="text-slate-700 space-y-2">
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              We only share your details with landlords or agents when you
                              clearly show interest in a listing or request to be connected
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              We do not sell personal information to third
                              parties
                            </li>
                            <li className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              We may use trusted service providers (for example, WhatsApp
                              infrastructure providers or cloud hosting) to help deliver the
                              service. They process data on our behalf under strict
                              confidentiality obligations.
                            </li>
                          </ul>
                        </section>

                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            4. Data Security
                          </h3>
                          <p className="text-slate-700">
                            We use reasonable technical and organisational safeguards to protect
                            information we hold. However, no method of transmission over the
                            internet or storage is 100% secure, so we cannot guarantee absolute
                            security. We will notify you of any serious data incident where we
                            are legally required to do so.
                          </p>
                        </section>

                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            5. Retention
                          </h3>
                          <p className="text-slate-700">
                            We keep data only for as long as it is needed for matching, safety,
                            resolving disputes, improving our service, or to meet legal and
                            regulatory requirements. When it is no longer needed, we aim to
                            delete or anonymise it in a reasonable timeframe.
                          </p>
                        </section>

                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            6. User Rights
                          </h3>
                          <p className="text-slate-700">
                            You may request to update, correct, or delete your
                            personal information by contacting our support team.
                          </p>
                        </section>

                        <section>
                          <h3 className="text-xl font-semibold text-slate-900 mb-4">
                            7. Contact
                          </h3>
                          <p className="text-slate-700 mb-4">
                            If you have questions about these Terms or our
                            Privacy Policy, please contact:
                          </p>
                          <div className="bg-slate-50 rounded-xl p-6">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary" />
                                <span className="font-medium text-slate-900">
                                  support@onukpa.com
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <MessageCircle className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-slate-900">
                                  WhatsApp: +233 24 509 5569
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Last Updated */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <a
                href="https://onukpa.com"
                className="text-center flex justify-center items-center font-bold underline text-slate-900"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndPrivacy;
