
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GlassCard from "@/components/ui/GlassCard";
import { FileUp, FileText, Check, X, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const PatientAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [patientText, setPatientText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulating file upload handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} has been uploaded.`,
      });
    }
  };

  // Simulating analysis process with progress updates
  const simulateAnalysis = () => {
    if (!file && !patientText) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please upload a file or enter patient information.",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisResults(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResults({
              demographics: {
                age: 56,
                gender: "Male",
                ethnicity: "Caucasian"
              },
              symptoms: [
                "Persistent cough",
                "Fever (101.2°F)",
                "Shortness of breath",
                "Fatigue"
              ],
              medicalHistory: [
                "Hypertension (diagnosed 2015)",
                "Type 2 Diabetes (diagnosed 2018)"
              ],
              geneticMarkers: [
                "CYP2D6 - Intermediate metabolizer",
                "SLCO1B1 - Reduced function"
              ],
              currentMedications: [
                "Lisinopril 10mg daily",
                "Metformin 500mg twice daily"
              ],
              allergies: [
                "Penicillin (severe rash)",
                "Shellfish"
              ]
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Patient Report Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Extract key symptoms, medical history, and genetic information from patient reports using our advanced NLP technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6 animate-slide-up">
              <GlassCard className="h-full">
                <h2 className="text-xl font-semibold mb-6">Upload Patient Data</h2>
                
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.png,.txt"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm font-medium mb-1">
                        {file ? file.name : "Drag & drop or click to upload"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports PDF, JPG, PNG, TXT
                      </p>
                    </label>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter Patient Information
                    </label>
                    <Textarea
                      placeholder="Enter symptoms, medical history, current medications, etc."
                      className="min-h-[150px]"
                      value={patientText}
                      onChange={e => setPatientText(e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={simulateAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Analyze Patient Data
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Processing data</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <GlassCard className="h-full">
                <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
                
                {!analysisResults ? (
                  <div className="text-center py-20 text-muted-foreground">
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" />
                        <p>Processing patient data with AI...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p>Upload or enter patient data to see analysis results</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Demographics</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <p className="font-medium">Age:</p>
                              <p>{analysisResults.demographics.age}</p>
                              <p className="font-medium">Gender:</p>
                              <p>{analysisResults.demographics.gender}</p>
                              <p className="font-medium">Ethnicity:</p>
                              <p>{analysisResults.demographics.ethnicity}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Symptoms</h3>
                          <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {analysisResults.symptoms.map((symptom: string, i: number) => (
                              <li key={i} className="flex items-start text-sm gap-2">
                                <span className="text-primary bg-primary-50 p-1 rounded-full">
                                  <Check className="h-3 w-3" />
                                </span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical History</h3>
                          <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {analysisResults.medicalHistory.map((item: string, i: number) => (
                              <li key={i} className="flex items-start text-sm gap-2">
                                <span className="text-primary bg-primary-50 p-1 rounded-full">
                                  <Check className="h-3 w-3" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Genetic Markers</h3>
                          <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {analysisResults.geneticMarkers.map((marker: string, i: number) => (
                              <li key={i} className="flex items-start text-sm gap-2">
                                <span className="text-primary bg-primary-50 p-1 rounded-full">
                                  <Check className="h-3 w-3" />
                                </span>
                                {marker}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Medications</h3>
                          <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {analysisResults.currentMedications.map((med: string, i: number) => (
                              <li key={i} className="flex items-start text-sm gap-2">
                                <span className="text-primary bg-primary-50 p-1 rounded-full">
                                  <Check className="h-3 w-3" />
                                </span>
                                {med}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
                          <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {analysisResults.allergies.map((allergy: string, i: number) => (
                              <li key={i} className="flex items-start text-sm gap-2">
                                <span className="text-destructive bg-destructive/10 p-1 rounded-full">
                                  <X className="h-3 w-3" />
                                </span>
                                {allergy}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-end">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Export Report
                      </Button>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Proceed to Recommendations
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

export default PatientAnalysis;
