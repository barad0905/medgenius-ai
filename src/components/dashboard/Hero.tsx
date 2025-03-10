import { ArrowRight, FileText, FlaskConical, HeartPulse, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 md:pb-24 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary-100 rounded-full opacity-70 blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-70 blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary-600 mb-4 animate-fade-in">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Drug Discovery</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
            Revolutionizing Medicine with AI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Advanced AI platform for drug discovery and personalized medicine, connecting patients with innovative treatments faster and more effectively.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/patient-analysis">
              <Button className="group h-11 px-6 gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <a href="#features">
              <Button variant="outline" className="h-11 px-6">Learn More</Button>
            </a>
          </div>
        </div>

        {/* Statistics/features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
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
                "flex flex-col items-center text-center p-6 rounded-xl border border-border bg-background shadow-subtle animate-slide-up",
              )}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="mb-4 p-3 rounded-full bg-primary-50">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
