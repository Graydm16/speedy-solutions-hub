import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - QuikTools</title>
        <meta name="description" content="QuikTools Privacy Policy. Learn how we handle your data and protect your privacy when using our online tools." />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              QuikTools is committed to protecting your privacy. This Privacy Policy explains how 
              we handle information when you use our online tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              QuikTools is designed with privacy in mind:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>We do not require user registration or accounts</li>
              <li>We do not collect personal information</li>
              <li>Tool data (timer settings, calculations, etc.) is stored locally in your browser</li>
              <li>We may collect anonymous usage statistics to improve our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Local Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              QuikTools uses local storage in your browser to save your preferences and tool 
              settings. This data never leaves your device and is not transmitted to our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use third-party services for analytics and advertising. These services may 
              use cookies or similar technologies. We encourage you to review their privacy 
              policies:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
              <li>Google Analytics - for understanding how visitors use our site</li>
              <li>Google AdSense - for displaying relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since QuikTools operates primarily in your browser with no server-side storage of 
              personal data, your information remains secure on your device. We use HTTPS to 
              ensure secure communication between your browser and our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              QuikTools does not knowingly collect information from children under 13. Our tools 
              are designed for general use and do not require any personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on 
              this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:support@quiktools.org" className="text-primary hover:text-primary/80">
                support@quiktools.org
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
