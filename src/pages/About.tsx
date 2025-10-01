import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About - QuikTools</title>
        <meta name="description" content="Learn about QuikTools and our mission to provide simple, fast, and reliable online utilities for everyone." />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">About QuikTools</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              QuikTools was created to provide simple, fast, and reliable online utilities for everyday tasks. 
              We believe that essential tools should be accessible to everyone, without unnecessary complexity 
              or clutter.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our suite of tools includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Timer - Set custom countdown timers for any task</li>
              <li>Stopwatch - Precise time measurement with lap tracking</li>
              <li>Calculator - Quick arithmetic calculations</li>
              <li>World Clock - Track time across different time zones</li>
              <li>Unit Converter - Convert between various units of measurement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose QuikTools?</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Fast and responsive interface</li>
              <li>No registration required</li>
              <li>Free to use</li>
              <li>Works on all devices</li>
              <li>Privacy-focused design</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default About;
