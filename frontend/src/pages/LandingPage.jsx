import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import LeadForm from '../components/LeadForm';

// Hook/Helper for animated counting
const AnimatedCounter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;
    
    const startTime = performance.now();
    
    const updateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [hasStarted, target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const LandingPage = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SVGs for Services
  const webIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  const mobileIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  const uiIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const aiIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  const cloudIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );

  const transIcon = (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18v3z" />
    </svg>
  );

  return (
    <div id="home" className="relative grid-bg min-h-screen text-slate-100 flex flex-col pt-20">
      {/* Top glowing radial gradients */}
      <div className="glow-overlay"></div>
      
      {/* Interactive floating particles or backgrounds */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-[50%] right-[10%] w-[25vw] h-[25vw] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-xs font-semibold text-brand-blue mb-8 animate-pulse">
          <span>Introducing LeadDeskmini AI Integrations</span>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none max-w-4xl text-gradient mb-6">
          Building Digital Products <br />
          <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple bg-clip-text text-transparent">
            That Scale
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          We design, build, and deploy high-performance custom web applications, cross-platform mobile products, and integrated AI workflows for enterprise leaders.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 w-full sm:w-auto">
          <button 
            onClick={scrollToContact} 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white brand-gradient hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(99,102,241,0.4)]"
          >
            Get Started
          </button>
          <button 
            onClick={scrollToServices} 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 transition-colors"
          >
            Explore Services
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-t border-white/5 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-blue mb-3">Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Our Engineering Services</h3>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Delivering technical systems and products built with absolute stability, performance-first architectures, and modern design systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={webIcon}
            title="Web Development"
            description="High-performance, secure, and SEO-optimized web systems built on cutting-edge architectures and technologies."
          />
          <ServiceCard
            icon={mobileIcon}
            title="Mobile Development"
            description="Polished native and hybrid applications with seamless interface animations and complex backend connections."
          />
          <ServiceCard
            icon={uiIcon}
            title="UI/UX Design"
            description="User-centric interfaces tailored to improve customer conversion, user retention, and premium brand impact."
          />
          <ServiceCard
            icon={aiIcon}
            title="AI Solutions"
            description="Specialized machine learning pipelines, LLM agent orchestrations, and automated cognitive decision nodes."
          />
          <ServiceCard
            icon={cloudIcon}
            title="Cloud Solutions"
            description="Auto-scaling server setups, network security configurations, and automated pipeline delivery integrations."
          />
          <ServiceCard
            icon={transIcon}
            title="Digital Transformation"
            description="Streamlining legacy paper workflows and spreadsheet dependencies into secure unified web platforms."
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-t border-white/5 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-blue mb-3">Values</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Why Partner With LeadDeskmini?</h3>
          <p className="text-slate-400 mt-4 leading-relaxed">
            We operate as an extension of your product organization, committing to software execution, reliability, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-[#0f172a]/40 border border-white/5 p-6 rounded-2xl">
            <div className="h-10 w-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Experienced Team</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Product managers and senior software engineering specialists driving standard codebase development.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0f172a]/40 border border-white/5 p-6 rounded-2xl">
            <div className="h-10 w-10 rounded-lg bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mb-5">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Fast Delivery</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Applying structured agile release sprints to ship features reliably and iterate frequently.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0f172a]/40 border border-white/5 p-6 rounded-2xl">
            <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Secure Solutions</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Standard secure development practices containing strict data validation and role protections.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0f172a]/40 border border-white/5 p-6 rounded-2xl">
            <div className="h-10 w-10 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-5">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Dedicated Support</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Active engineering support availability, health checks, and scale operations updates.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-[#04070e] border-y border-white/5 w-full py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2 font-mono">
                <AnimatedCounter target="250" suffix="+" />
              </div>
              <p className="text-slate-400 text-sm md:text-base font-medium">Projects Delivered</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-indigo mb-2 font-mono">
                <AnimatedCounter target="120" suffix="" />
              </div>
              <p className="text-slate-400 text-sm md:text-base font-medium">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-cyan mb-2 font-mono">
                <AnimatedCounter target="98" suffix="%" />
              </div>
              <p className="text-slate-400 text-sm md:text-base font-medium">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-purple mb-2 font-mono">
                <AnimatedCounter target="8" suffix="" />
              </div>
              <p className="text-slate-400 text-sm md:text-base font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-blue mb-3">Feedback</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Trusted by Industry Leaders</h3>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Read what technical directors and operations managers have to say about working with LeadDeskmini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-[#0f172a]/30 border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
            <div className="mb-6">
              {/* Star icons */}
              <div className="flex space-x-1 text-brand-blue mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4.5 w-4.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "LeadDeskmini transformed our product vision into a scalable web application. Their technical capability and delivery speed were outstanding."
              </p>
            </div>
            <div className="flex items-center space-x-3.5 border-t border-white/5 pt-5">
              <div className="h-10 w-10 rounded-full brand-gradient flex items-center justify-center text-white font-bold text-sm">
                SJ
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Sarah Jenkins</h5>
                <p className="text-slate-500 text-xs">CTO, TechFlow Systems</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#0f172a]/30 border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
            <div className="mb-6">
              <div className="flex space-x-1 text-brand-blue mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4.5 w-4.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "The custom AI assistant solution designed by LeadDeskmini has cut our customer support volume by 40%. Highly recommend their backend engineering team."
              </p>
            </div>
            <div className="flex items-center space-x-3.5 border-t border-white/5 pt-5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple flex items-center justify-center text-white font-bold text-sm">
                MC
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Marcus Chen</h5>
                <p className="text-slate-500 text-xs">VP of Operations, Apex Health Group</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#0f172a]/30 border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
            <div className="mb-6">
              <div className="flex space-x-1 text-brand-blue mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4.5 w-4.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "We redesigned our entire logistics portal with LeadDeskmini. The interface is intuitive, fast, and our warehouse inventory coordinators absolutely love it."
              </p>
            </div>
            <div className="flex items-center space-x-3.5 border-t border-white/5 pt-5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-violet flex items-center justify-center text-white font-bold text-sm">
                ER
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Elena Rostova</h5>
                <p className="text-slate-500 text-xs">Product Director, Innovate Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form / Contact Section */}
      <section id="contact" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-blue mb-3">Partner</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Request a Proposal</h3>
          <p className="text-slate-400 mt-4">
            Fill out the form below. Our development experts will evaluate your specifications and set up a scoping call.
          </p>
        </div>

        <LeadForm />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
