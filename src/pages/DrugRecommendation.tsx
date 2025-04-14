import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GlassCard from "@/components/ui/GlassCard";
import { Search, ArrowRight, Pill, RotateCcw, Info, Shield, Tag, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { fetchGroqAI, parseAIResponse, deepParseJsonStrings } from "@/utils/apiService";

const DrugRecommendation = () => {
  const [patientInfo, setPatientInfo] = useState("");
  const [disease, setDisease] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleGenerateRecommendations = async () => {
    if (!patientInfo || !disease) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please enter patient information and the disease.",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setRecommendations(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 90) {
          clearInterval(interval);
          return 90;
        }
        return newProgress;
      });
    }, 300);

    try {
      const prompt = `Provide drug recommendations for a patient with the following information: ${patientInfo}. The patient has been diagnosed with ${disease}. Include potential side effects, dosage, and precautions. Format your response as a JSON object with 'drugName', 'dosage', 'sideEffects', and 'precautions' keys.`;
      
      const response = await fetchGroqAI({
        prompt,
        systemMessage: "You are a medical AI assistant specialized in providing drug recommendations based on patient information and diagnosis."
      });
      
      const content = response.choices[0].message.content;
      const result = parseAIResponse(content);
      
      const processedResult = deepParseJsonStrings(result);
      
      setRecommendations(processedResult);
      clearInterval(interval);
      setProgress(100);

      toast({
        title: "Recommendations generated",
        description: "Drug recommendations have been generated successfully.",
      });
    } catch (error) {
      console.error("Recommendation error:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "Error during recommendation generation. Please try again.",
      });
      clearInterval(interval);
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              AI-Powered Drug Recommendation
            </h1>
            <p className="text-lg text-muted-foreground">
              Get personalized drug recommendations based on patient information and diagnosis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 animate-slide-up">
              <GlassCard className="h-full">
                <h2 className="text-xl font-semibold mb-6">Enter Patient Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Patient Information
                    </label>
                    <Textarea
                      placeholder="Enter patient details, medical history, current medications, etc."
                      className="min-h-[150px]"
                      value={patientInfo}
                      onChange={e => setPatientInfo(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Disease Diagnosis
                    </label>
                    <Input
                      placeholder="Enter the disease diagnosis"
                      value={disease}
                      onChange={e => setDisease(e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleGenerateRecommendations}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Pill className="mr-2 h-4 w-4" />
                        Generate Recommendations
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Generating recommendations</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <GlassCard className="h-full">
                <h2 className="text-xl font-semibold mb-6">Drug Recommendations</h2>
                
                {!recommendations ? (
                  <div className="text-center py-20 text-muted-foreground">
                    {isGenerating ? (
                      <div className="space-y-4">
                        <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" />
                        <p>Generating drug recommendations based on patient data...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Search className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p>Enter patient information and disease to see drug recommendations</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    {Array.isArray(recommendations) ? (
                      recommendations.map((rec: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-primary mb-3">{rec.drugName}</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium">Dosage:</span> {rec.dosage}
                            </div>
                            <div>
                              <span className="font-medium">Side Effects:</span> {rec.sideEffects}
                            </div>
                            <div>
                              <span className="font-medium">Precautions:</span> {rec.precautions}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-primary mb-3">{recommendations.drugName}</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium">Dosage:</span> {recommendations.dosage}
                          </div>
                          <div>
                            <span className="font-medium">Side Effects:</span> {recommendations.sideEffects}
                          </div>
                          <div>
                            <span className="font-medium">Precautions:</span> {recommendations.precautions}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button onClick={() => setRecommendations(null)}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
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

export default DrugRecommendation;
