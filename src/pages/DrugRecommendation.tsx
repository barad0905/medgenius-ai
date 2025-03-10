
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { 
  Search, FlaskConical, User, FileText, BarChart, 
  ShieldCheck, PlusCircle, Loader2, ChevronRight, 
  Star, Scale, Heart, Pill, Dna
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Sample patient data
const patientData = {
  id: "PT-10284",
  name: "John Smith",
  age: 56,
  gender: "Male",
  condition: "Type 2 Diabetes with Hypertension",
  geneticMarkers: [
    { name: "CYP2D6", status: "Intermediate metabolizer" },
    { name: "SLCO1B1", status: "Reduced function" }
  ]
};

// Sample drug recommendations
const drugRecommendations = [
  {
    name: "Metformin XR",
    score: 92,
    confidence: "High",
    effectiveness: 94,
    sideEffects: "Low",
    interactions: "Minimal",
    geneticMatch: "Optimal",
    reasoning: [
      "Excellent glycemic control for T2DM patients",
      "Low risk profile for patients with hypertension",
      "Compatible with CYP2D6 intermediate metabolizer status",
      "Minimal drug interactions with current medications"
    ]
  },
  {
    name: "Lisinopril",
    score: 88,
    confidence: "High",
    effectiveness: 90,
    sideEffects: "Low to Moderate",
    interactions: "Minimal",
    geneticMatch: "Good",
    reasoning: [
      "Effective blood pressure management",
      "Protective renal effects beneficial for diabetic patients",
      "Well-tolerated in patients with metabolic conditions",
      "Favorable pharmacokinetic profile for the patient's genetic markers"
    ]
  },
  {
    name: "Empagliflozin",
    score: 85,
    confidence: "Medium",
    effectiveness: 89,
    sideEffects: "Low to Moderate",
    interactions: "Low",
    geneticMatch: "Good",
    reasoning: [
      "Provides both glycemic control and cardiovascular benefits",
      "Reduces risk of heart failure in diabetic patients",
      "Minimal interaction with SLCO1B1 reduced function variant",
      "Additional weight reduction benefit"
    ]
  },
  {
    name: "Atorvastatin",
    score: 78,
    confidence: "Medium",
    effectiveness: 86,
    sideEffects: "Moderate",
    interactions: "Present, but manageable",
    geneticMatch: "Moderate",
    reasoning: [
      "Beneficial lipid-lowering effects for diabetic patients",
      "Cardiovascular risk reduction",
      "SLCO1B1 variant may require dose adjustment",
      "Monitor for muscle-related side effects"
    ]
  }
];

const DrugRecommendation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedDrug, setSelectedDrug] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Drug Recommendation
            </h1>
            <p className="text-lg text-muted-foreground">
              AI-powered personalized drug recommendations based on patient data, genetic markers, and medical history.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Patient Information */}
            <div className="lg:col-span-1 animate-slide-up">
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Patient Profile</h2>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Full Report
                  </Button>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="bg-primary-50 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{patientData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {patientData.age} years, {patientData.gender} • ID: {patientData.id}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Primary Condition
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      {patientData.condition}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Genetic Markers
                    </h4>
                    <ul className="space-y-2">
                      {patientData.geneticMarkers.map((marker, i) => (
                        <li key={i} className="bg-gray-50 p-3 rounded-lg text-sm flex items-center">
                          <Dna className="h-4 w-4 mr-2 text-primary" />
                          <div>
                            <span className="font-medium">{marker.name}:</span>{" "}
                            {marker.status}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Update Patient Information
                </Button>
              </GlassCard>
            </div>
            
            {/* Drug Recommendations */}
            <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <GlassCard>
                <h2 className="text-xl font-semibold mb-6">AI-Generated Drug Recommendations</h2>
                
                {isLoading ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="space-y-6 max-w-xs mx-auto">
                      <FlaskConical className="h-12 w-12 mx-auto text-primary animate-pulse-slow" />
                      <h3 className="font-medium">Analyzing patient data...</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI is analyzing genetic markers, medical history, and current conditions to find the optimal treatment options.
                      </p>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {drugRecommendations.map((drug, i) => (
                        <div
                          key={i}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all duration-300",
                            selectedDrug === drug 
                              ? "border-primary bg-primary-50/50 shadow-sm" 
                              : "hover:border-primary/30 hover:shadow-sm"
                          )}
                          onClick={() => setSelectedDrug(drug)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                              <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center text-white mr-3",
                                drug.score >= 90 ? "bg-green-500" : 
                                drug.score >= 80 ? "bg-primary" : "bg-amber-500"
                              )}>
                                <Pill className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium">{drug.name}</h3>
                                <div className="flex items-center text-sm">
                                  <div className="flex gap-1 mr-2">
                                    {[...Array(Math.floor(drug.score / 20))].map((_, i) => (
                                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    ))}
                                    {[...Array(5 - Math.floor(drug.score / 20))].map((_, i) => (
                                      <Star key={i} className="h-3 w-3 text-gray-300" />
                                    ))}
                                  </div>
                                  <span className="text-muted-foreground">{drug.score}% match</span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <BarChart className="h-3 w-3 text-primary mr-1" />
                              <span className="text-muted-foreground">Effectiveness:</span>
                            </div>
                            <span className="font-medium">{drug.effectiveness}%</span>
                            
                            <div className="flex items-center">
                              <ShieldCheck className="h-3 w-3 text-primary mr-1" />
                              <span className="text-muted-foreground">Side Effects:</span>
                            </div>
                            <span className="font-medium">{drug.sideEffects}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedDrug && (
                      <div className="animate-fade-in border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">{selectedDrug.name} • Detailed Analysis</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <BarChart className="h-4 w-4 text-primary mr-2" />
                              <h4 className="font-medium">Effectiveness</h4>
                            </div>
                            <div className="flex items-center">
                              <span className="text-2xl font-bold">{selectedDrug.effectiveness}%</span>
                              <span className="ml-2 text-sm text-muted-foreground">Confidence: {selectedDrug.confidence}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <ShieldCheck className="h-4 w-4 text-primary mr-2" />
                              <h4 className="font-medium">Safety Profile</h4>
                            </div>
                            <div>
                              <div className="text-sm"><span className="font-medium">Side Effects:</span> {selectedDrug.sideEffects}</div>
                              <div className="text-sm"><span className="font-medium">Interactions:</span> {selectedDrug.interactions}</div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Dna className="h-4 w-4 text-primary mr-2" />
                              <h4 className="font-medium">Genetic Compatibility</h4>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">{selectedDrug.geneticMatch}</span>
                              <div className="ml-2 flex">
                                {[...Array(selectedDrug.geneticMatch === "Optimal" ? 3 : selectedDrug.geneticMatch === "Good" ? 2 : 1)].map((_, i) => (
                                  <Dna key={i} className="h-3 w-3 text-primary" />
                                ))}
                                {[...Array(3 - (selectedDrug.geneticMatch === "Optimal" ? 3 : selectedDrug.geneticMatch === "Good" ? 2 : 1))].map((_, i) => (
                                  <Dna key={i} className="h-3 w-3 text-muted" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="font-medium mb-3">AI Reasoning</h4>
                          <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {selectedDrug.reasoning.map((reason: string, i: number) => (
                              <li key={i} className="flex items-start text-sm gap-2">
                                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Full Research Data
                          </Button>
                          <Button>
                            <Heart className="h-4 w-4 mr-2" />
                            Accept Recommendation
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Missing component
const Check = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export default DrugRecommendation;
