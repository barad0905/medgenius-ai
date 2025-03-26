
import { ArrowRight, FileText, FlaskConical, HeartPulse, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 md:pb-24 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100 rounded-full opacity-70 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-80 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary-50 rounded-full opacity-60 blur-3xl" />
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-50 rounded-full opacity-60 blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary-600 mb-4 animate-fade-in backdrop-blur-sm shadow-sm">
            <Sparkles className="h-4 w-4 mr-2 animate-pulse-slow" />
            <span className="text-sm font-medium">AI-Powered Drug Discovery</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-transparent bg-clip-text">
            Revolutionizing Medicine with AI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Advanced AI platform for drug discovery and personalized medicine, connecting patients with innovative treatments faster and more effectively.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/patient-analysis">
              <Button size="lg" className="group h-12 px-6 gap-2 shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <a href="#features">
              <Button variant="outline" size="lg" className="h-12 px-6 shadow-sm hover:shadow-md transition-all border-primary/20 hover:bg-primary-50/30">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        {/* Statistics/features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            {
              icon: <FileText className="h-10 w-10 text-primary-500" />,
              title: "Patient Analysis",
              description: "Extract key information from patient reports with advanced NLP"
            },
            {
              icon: <FlaskConical className="h-10 w-10 text-primary-500" />,
              title: "Drug Discovery",
              description: "Generate novel drug molecules using state-of-the-art AI"
            },
            {
              icon: <HeartPulse className="h-10 w-10 text-primary-500" />,
              title: "Personalized Medicine",
              description: "Recommend treatments based on genetic markers and patient data"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center text-center p-8 rounded-xl border border-primary/10 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all animate-slide-up hover:-translate-y-1",
              )}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
