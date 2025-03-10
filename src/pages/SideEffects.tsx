
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldAlert, Search, ArrowRightLeft, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SideEffects = () => {
  const [drugName, setDrugName] = useState("");
  const [interactionDrugs, setInteractionDrugs] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handlePrediction = () => {
    if (!drugName.trim()) {
      toast({
        title: "Drug name is required",
        description: "Please enter a drug name to predict side effects.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      toast({
        title: "Prediction complete",
        description: "Side effect prediction analysis has been completed successfully.",
      });
    }, 1500);
  };

  const handleInteractionCheck = () => {
    if (!interactionDrugs[0].trim() || !interactionDrugs[1].trim()) {
      toast({
        title: "Both drug names are required",
        description: "Please enter names for both drugs to check for interactions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      toast({
        title: "Interaction check complete",
        description: "Drug interaction analysis has been completed successfully.",
      });
    }, 1500);
  };

  const sideEffects = [
    { name: "Headache", probability: 0.72, severity: "Mild", management: "Over-the-counter pain relievers, rest" },
    { name: "Nausea", probability: 0.65, severity: "Moderate", management: "Take with food, anti-nausea medication" },
    { name: "Dizziness", probability: 0.58, severity: "Moderate", management: "Avoid driving, change positions slowly" },
    { name: "Fatigue", probability: 0.45, severity: "Mild", management: "Adequate rest, moderate exercise" },
    { name: "Rash", probability: 0.32, severity: "Mild to Severe", management: "Discontinue if severe, topical steroids" },
    { name: "Insomnia", probability: 0.28, severity: "Mild", management: "Take medication in the morning, sleep hygiene" }
  ];

  const interactions = [
    { 
      drug1: "Lisinopril", 
      drug2: "Ibuprofen", 
      severity: "Moderate", 
      effect: "May reduce the blood pressure-lowering effects of lisinopril and increase risk of kidney damage", 
      recommendation: "Monitor blood pressure, consider alternative pain reliever" 
    },
    { 
      drug1: "Lisinopril", 
      drug2: "Potassium supplements", 
      severity: "Severe", 
      effect: "Increased risk of high potassium levels (hyperkalemia)", 
      recommendation: "Avoid combination or monitor potassium levels closely" 
    },
    { 
      drug1: "Lisinopril", 
      drug2: "Spironolactone", 
      severity: "Severe", 
      effect: "Increased risk of high potassium levels (hyperkalemia)", 
      recommendation: "Monitor potassium levels closely, adjust dosages as needed" 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-primary-50 to-white pt-32 pb-16">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary-600 mb-4">
                <ShieldAlert className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Side Effect Prediction</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                AI-Powered Side Effect & Interaction Analysis
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Identify possible side effects and detect harmful drug interactions before prescribing using predictive AI models.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 max-w-3xl mx-auto">
              <Tabs defaultValue="side-effects" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="side-effects">Side Effect Prediction</TabsTrigger>
                  <TabsTrigger value="interactions">Drug Interactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="side-effects" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Drug Name</label>
                      <Input 
                        placeholder="Enter drug name (e.g., Lisinopril)" 
                        value={drugName}
                        onChange={(e) => setDrugName(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handlePrediction}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>Analyzing...</>
                      ) : (
                        <>
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          Predict Side Effects
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="interactions" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Drug 1</label>
                      <Input 
                        placeholder="Enter first drug name" 
                        value={interactionDrugs[0]}
                        onChange={(e) => setInteractionDrugs([e.target.value, interactionDrugs[1]])}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Drug 2</label>
                      <Input 
                        placeholder="Enter second drug name" 
                        value={interactionDrugs[1]}
                        onChange={(e) => setInteractionDrugs([interactionDrugs[0], e.target.value])}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleInteractionCheck}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>Analyzing...</>
                      ) : (
                        <>
                          <ArrowRightLeft className="mr-2 h-4 w-4" />
                          Check Interactions
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Results section */}
        {showResults && (
          <section className="py-16 px-4">
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Analysis Results</h2>
              
              <Tabs defaultValue="side-effects" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md">
                  <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
                  <TabsTrigger value="interactions">Interactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="side-effects">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sideEffects.map((effect, index) => (
                      <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className={`rounded-full p-2 ${
                            effect.probability > 0.6 
                              ? "bg-red-50 text-red-600" 
                              : effect.probability > 0.4 
                                ? "bg-yellow-50 text-yellow-600" 
                                : "bg-green-50 text-green-600"
                          }`}>
                            <ShieldAlert className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">{effect.name}</h3>
                              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                effect.probability > 0.6 
                                  ? "bg-red-50 text-red-600" 
                                  : effect.probability > 0.4 
                                    ? "bg-yellow-50 text-yellow-600" 
                                    : "bg-green-50 text-green-600"
                              }`}>
                                {Math.round(effect.probability * 100)}%
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium">Severity:</span> {effect.severity}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Management:</span> {effect.management}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="interactions">
                  <div className="space-y-6">
                    {interactions.map((interaction, index) => (
                      <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className={`rounded-full p-2 ${
                            interaction.severity === "Severe" 
                              ? "bg-red-50 text-red-600" 
                              : interaction.severity === "Moderate" 
                                ? "bg-yellow-50 text-yellow-600" 
                                : "bg-green-50 text-green-600"
                          }`}>
                            <ArrowRightLeft className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">
                                {interaction.drug1} + {interaction.drug2}
                              </h3>
                              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                interaction.severity === "Severe" 
                                  ? "bg-red-50 text-red-600" 
                                  : interaction.severity === "Moderate" 
                                    ? "bg-yellow-50 text-yellow-600" 
                                    : "bg-green-50 text-green-600"
                              }`}>
                                {interaction.severity}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {interaction.effect}
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg flex gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">Recommendation:</span> {interaction.recommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}

        {/* AI Analysis section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary-600 mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Advanced Analysis</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Personalized Risk Assessment
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI system analyzes patient data, including age, weight, existing conditions, and current medications to provide a personalized risk assessment for potential side effects.
                </p>
                <Button>
                  Upload Patient Profile
                </Button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="rounded-lg overflow-hidden border shadow-sm h-72 w-full max-w-md bg-gray-100 flex items-center justify-center">
                  <span className="text-muted-foreground">Risk Assessment Visualization</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SideEffects;
