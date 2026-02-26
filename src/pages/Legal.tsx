import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-light text-foreground mb-16">Legal</h1>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-20">
          <h2 className="text-2xl font-light text-foreground mb-6">Privacy Policy</h2>
          <div className="space-y-4 text-sm text-muted-foreground font-light leading-relaxed">
            <p><strong className="text-foreground font-medium">Effective Date:</strong> February 2025</p>
            <p>
              The Tomorrow Company ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">1. Information We Collect</h3>
            <p>
              We may collect personal information you voluntarily provide, including your name, email address, company name, and any message content submitted through our contact form. We also automatically collect certain technical data such as IP address, browser type, device information, and usage analytics.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">2. How We Use Your Information</h3>
            <p>
              We use collected information to respond to inquiries, improve our website and services, communicate updates or relevant content, comply with legal obligations, and analyze usage patterns to enhance user experience.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">3. Data Sharing</h3>
            <p>
              We do not sell or rent your personal information. We may share data with trusted service providers who assist in operating our website, conducting business, or servicing you, provided they agree to keep information confidential. We may also disclose information when required by law.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">4. Data Security</h3>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">5. Cookies</h3>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, though some features may not function properly.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">6. Your Rights</h3>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@thetomorrowcompany.com.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">7. Changes to This Policy</h3>
            <p>
              We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.
            </p>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms">
          <h2 className="text-2xl font-light text-foreground mb-6">Terms of Service</h2>
          <div className="space-y-4 text-sm text-muted-foreground font-light leading-relaxed">
            <p><strong className="text-foreground font-medium">Effective Date:</strong> February 2025</p>
            <p>
              By accessing and using The Tomorrow Company website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">1. Use of Website</h3>
            <p>
              This website is provided for informational purposes only. The content does not constitute financial, legal, or investment advice. You agree to use this website only for lawful purposes and in accordance with these terms.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">2. Intellectual Property</h3>
            <p>
              All content, logos, trademarks, and materials on this website are the property of The Tomorrow Company or its licensors. You may not reproduce, distribute, modify, or create derivative works without prior written consent.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">3. No Investment Advice</h3>
            <p>
              Nothing on this website should be construed as an offer to sell, a solicitation of an offer to buy, or a recommendation for any security, investment, or strategy. All investment decisions should be made with the advice of qualified professionals.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">4. Limitation of Liability</h3>
            <p>
              The Tomorrow Company shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website. We make no warranties regarding the accuracy, completeness, or reliability of any content.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">5. Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of any external sites. Accessing third-party links is at your own risk.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">6. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to conflict of law principles.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">7. Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms of Service at any time. Continued use of the website following any changes constitutes acceptance of the revised terms.
            </p>
            <h3 className="text-foreground font-medium text-base pt-4">8. Contact</h3>
            <p>
              For questions regarding these terms, please contact us at info@thetomorrowcompany.com.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;