
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Hero from "@/components/dashboard/Hero";
import Features from "@/components/dashboard/Features";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ArrowUpRight, Brain, Dna, Heart } from "lucide-react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* How it works section */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How MedGenius AI Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Our AI-powered platform transforms the drug discovery process through these key steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Data Analysis",
                  description: "Our AI analyzes patient reports, research papers, and medical data to identify patterns and insights.",
                  icon: <Brain className="h-8 w-8 text-primary" />,
                  steps: ["Extract medical data", "Process through NLP", "Identify key markers"]
                },
                {
                  title: "AI-Powered Modeling",
                  description: "Advanced models predict drug efficacy, potential interactions, and generate novel molecular structures.",
                  icon: <Dna className="h-8 w-8 text-primary" />,
                  steps: ["Generate drug candidates", "Simulate interactions", "Optimize molecular structures"]
                },
                {
                  title: "Personalized Recommendations",
                  description: "Patients receive tailored treatment recommendations based on their unique genetic profile.",
                  icon: <Heart className="h-8 w-8 text-primary" />,
                  steps: ["Match patient profiles", "Rank treatment options", "Provide explained results"]
                }
              ].map((step, i) => (
                <div 
                  key={i}
                  className="flex flex-col p-8 rounded-2xl border border-border bg-white shadow-subtle animate-slide-up"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className="mb-6 p-4 rounded-full bg-primary-50 w-fit">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {step.steps.map((item, j) => (
                      <li key={j} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-primary-50 opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-100 rounded-full opacity-70 blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Revolutionize Drug Discovery?
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Join the AI-powered revolution in medicine. Start exploring our platform today and see how AI can accelerate drug discovery and improve patient outcomes.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link to="/patient-analysis">
                  <Button className="group h-11 px-6 gap-2">
                    Get Started Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <a href="#">
                  <Button variant="outline" className="h-11 px-6 gap-2">
                    View Documentation
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
