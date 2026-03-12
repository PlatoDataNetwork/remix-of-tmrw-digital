import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Legal" description="Privacy policy, terms of service, and legal disclaimers for The Tomorrow Company." path="/legal" noindex />
      <Navbar />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">Legal</h1>
        <p className="text-lg text-muted-foreground font-light mb-16">Effective Date: 2/27/2026</p>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-20">
          <h2 className="text-2xl font-light text-foreground mb-6">Privacy Policy</h2>
          <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              The Tomorrow Company ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">1. Information We Collect</h3>
            <p>
              We may collect personal information you voluntarily provide, including your name, email address, company name, and any message content submitted through our contact form. We also automatically collect certain technical data such as IP address, browser type, device information, and usage analytics.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">2. How We Use Your Information</h3>
            <p>
              We use collected information to respond to inquiries, improve our website and services, communicate updates or relevant content, comply with legal obligations, and analyze usage patterns to enhance user experience.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">3. Data Sharing</h3>
            <p>
              We do not sell or rent your personal information. We may share data with trusted service providers who assist in operating our website, conducting business, or servicing you, provided they agree to keep information confidential. We may also disclose information when required by law.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">4. Data Security</h3>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">5. Cookies</h3>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, though some features may not function properly.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">6. Your Rights</h3>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@thetomorrowcompany.com.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">7. Changes to This Policy</h3>
            <p>
              We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.
            </p>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms" className="mb-20">
          <h2 className="text-2xl font-light text-foreground mb-6">Terms of Service</h2>
          <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              By accessing and using The Tomorrow Company website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">1. Use of Website</h3>
            <p>
              This website is provided for informational purposes only. The content does not constitute financial, legal, or investment advice. You agree to use this website only for lawful purposes and in accordance with these terms.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">2. Intellectual Property</h3>
            <p>
              All content, logos, trademarks, and materials on this website are the property of The Tomorrow Company or its licensors. You may not reproduce, distribute, modify, or create derivative works without prior written consent.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">3. No Investment Advice</h3>
            <p>
              Nothing on this website should be construed as an offer to sell, a solicitation of an offer to buy, or a recommendation for any security, investment, or strategy. All investment decisions should be made with the advice of qualified professionals.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">4. Limitation of Liability</h3>
            <p>
              The Tomorrow Company shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website. We make no warranties regarding the accuracy, completeness, or reliability of any content.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">5. Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of any external sites. Accessing third-party links is at your own risk.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">6. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to conflict of law principles.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">7. Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms of Service at any time. Continued use of the website following any changes constitutes acceptance of the revised terms.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">8. Contact</h3>
            <p>
              For questions regarding these terms, please contact us at info@thetomorrowcompany.com.
            </p>
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="mb-20">
          <h2 className="text-2xl font-light text-foreground mb-6">Compliance</h2>
          <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              The Tomorrow Company is committed to maintaining the highest standards of regulatory compliance across all jurisdictions in which we operate. Our compliance framework is designed to meet applicable legal requirements and industry best practices.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">1. Regulatory Framework</h3>
            <p>
              We adhere to all applicable securities regulations, anti-money laundering (AML) laws, and know-your-customer (KYC) requirements in connection with our digital asset and tokenization services. Our operations are structured to comply with federal and provincial regulations in Canada and relevant international standards.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">2. Anti-Money Laundering (AML)</h3>
            <p>
              We maintain robust AML policies and procedures designed to detect, prevent, and report suspicious activity. All team members receive regular training on AML obligations and emerging risks in the digital asset space.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">3. Know Your Customer (KYC)</h3>
            <p>
              Prior to engaging in certain services, clients may be required to complete identity verification procedures. We use industry-standard identity verification tools and maintain records in accordance with applicable retention requirements.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">4. Sanctions Compliance</h3>
            <p>
              We screen all counterparties against applicable sanctions lists and do not engage in transactions with sanctioned individuals, entities, or jurisdictions.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">5. Reporting & Transparency</h3>
            <p>
              We are committed to transparency in our operations and will cooperate with regulatory authorities as required. Any compliance concerns can be reported to compliance@thetomorrowcompany.com.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-20">
          <h2 className="text-2xl font-light text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
            <h3 className="text-foreground font-medium text-lg pt-4">What is The Tomorrow Company?</h3>
            <p>
              The Tomorrow Company is a digital strategy and technology firm specializing in Web3, AI, real-world asset tokenization, and advanced data intelligence solutions for institutional and enterprise clients.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">What are Real-World Assets (RWAs)?</h3>
            <p>
              Real-world assets are tangible or traditional financial assets—such as real estate, commodities, energy, infrastructure, and carbon credits—that are tokenized on blockchain networks to enable fractional ownership, enhanced liquidity, and transparent settlement.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">Is this an investment platform?</h3>
            <p>
              No. The Tomorrow Company provides advisory, technology, and strategic services. We do not offer investment products or financial advice. Please consult qualified financial professionals for investment decisions.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">How do I contact The Tomorrow Company?</h3>
            <p>
              You can reach us via email at bf@amplifix.net or through the contact section on our website.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">Where is The Tomorrow Company based?</h3>
            <p>
              Our headquarters are located at 300-10991 Shellbridge Way, Richmond, BC V6X 3C6, Canada.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">Do you operate internationally?</h3>
            <p>
              Yes. While headquartered in Canada, we serve clients and partners across multiple jurisdictions, adhering to all applicable local regulations.
            </p>
          </div>
        </section>

        {/* Data Processing */}
        <section id="data-processing">
          <h2 className="text-2xl font-light text-foreground mb-6">Data Processing</h2>
          <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              This Data Processing Statement outlines how The Tomorrow Company processes personal data in connection with its services and operations. It supplements our Privacy Policy and provides additional detail on our data handling practices.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">1. Data Controller</h3>
            <p>
              Tomorrow Digital Inc., operating as The Tomorrow Company, acts as the data controller for personal information collected through our website and services. For inquiries, contact us at info@thetomorrowcompany.com.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">2. Categories of Data Processed</h3>
            <p>
              We process the following categories of personal data: identity data (name, email, company), technical data (IP address, browser type, device information), usage data (page views, interactions, session duration), and communication data (messages submitted via contact forms).
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">3. Legal Basis for Processing</h3>
            <p>
              We process personal data based on legitimate interest (improving our services and user experience), consent (where explicitly provided for marketing communications), contractual necessity (fulfilling service agreements), and legal obligation (compliance with applicable laws and regulations).
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">4. Data Retention</h3>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. Contact form submissions are retained for a maximum of 24 months unless a longer retention period is required for legal or business purposes.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">5. International Transfers</h3>
            <p>
              Where personal data is transferred outside of Canada, we ensure appropriate safeguards are in place, including standard contractual clauses and adherence to applicable data protection frameworks.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">6. Sub-Processors</h3>
            <p>
              We engage third-party service providers to assist with hosting, analytics, and communication services. All sub-processors are contractually bound to process data in accordance with our instructions and applicable data protection laws.
            </p>
            <h3 className="text-foreground font-medium text-lg pt-4">7. Your Rights</h3>
            <p>
              You have the right to access, rectify, erase, restrict processing of, and port your personal data. To exercise any of these rights, contact us at info@thetomorrowcompany.com. We will respond to requests within 30 days.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;