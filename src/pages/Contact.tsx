import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact - QuikTools</title>
        <meta name="description" content="Get in touch with QuikTools. Send us your questions, feedback, or bug reports." />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          
          <section className="mb-8">
            <p className="text-muted-foreground leading-relaxed mb-6">
              We'd love to hear from you! Whether you have questions, feedback, or suggestions 
              for new tools, feel free to reach out.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Email</h3>
              </div>
              <p className="text-muted-foreground">
                For general inquiries and support:
              </p>
              <a href="mailto:support@quiktools.org" className="text-primary hover:text-primary/80 text-lg font-medium">
                support@quiktools.org
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your feedback helps us improve QuikTools. If you have suggestions for new features 
              or improvements to existing tools, please don't hesitate to contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Bug Reports</h2>
            <p className="text-muted-foreground leading-relaxed">
              Found a bug? We appreciate your help in making QuikTools better. Please send us 
              a detailed description of the issue, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
              <li>Which tool you were using</li>
              <li>What you expected to happen</li>
              <li>What actually happened</li>
              <li>Your browser and device information</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Contact;
