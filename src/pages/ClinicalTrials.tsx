
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TestTube, Search, Users, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ClinicalTrials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search field is empty",
        description: "Please enter a condition, treatment or location to search for clinical trials.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Clinical trials found",
        description: "We found 6 clinical trials matching your search criteria.",
      });
    }, 1500);
  };

  const trials = [
    {
      id: 1,
      title: "Novel Immunotherapy for Advanced Melanoma",
      location: "Mayo Clinic, Rochester, MN",
      phase: "Phase 2",
      status: "Recruiting",
      participants: 120,
      description: "Testing a new immune checkpoint inhibitor in patients with stage III or IV melanoma who have failed prior therapy.",
    },
    {
      id: 2,
      title: "Gene Therapy for Cystic Fibrosis",
      location: "Johns Hopkins Hospital, Baltimore, MD",
      phase: "Phase 1",
      status: "Active",
      participants: 45,
      description: "Evaluating the safety of a viral vector-based gene therapy approach to correct CFTR gene mutations.",
    },
    {
      id: 3,
      title: "Novel Antibody Treatment for Rheumatoid Arthritis",
      location: "Cleveland Clinic, OH",
      phase: "Phase 3",
      status: "Recruiting",
      participants: 350,
      description: "Testing the efficacy of a new monoclonal antibody targeting IL-6 in patients with moderate to severe rheumatoid arthritis.",
    },
    {
      id: 4,
      title: "Personalized mRNA Vaccine for Colorectal Cancer",
      location: "MD Anderson Cancer Center, Houston, TX",
      phase: "Phase 1/2",
      status: "Recruiting",
      participants: 80,
      description: "Investigating a personalized mRNA vaccine approach for patients with stage II-III colorectal cancer after surgery.",
    },
    {
      id: 5,
      title: "CRISPR-based Therapy for Sickle Cell Disease",
      location: "Massachusetts General Hospital, Boston, MA",
      phase: "Phase 1",
      status: "Recruiting",
      participants: 30,
      description: "Evaluating the safety and efficacy of a CRISPR-Cas9 gene editing approach to correct the sickle cell mutation in hematopoietic stem cells.",
    },
    {
      id: 6,
      title: "Novel Small Molecule for Treatment-Resistant Depression",
      location: "Stanford University Medical Center, CA",
      phase: "Phase 2",
      status: "Active",
      participants: 200,
      description: "Testing a new small molecule that modulates glutamate signaling in patients with treatment-resistant major depressive disorder.",
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
                <TestTube className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Find Clinical Trials</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Connect with Leading Clinical Trials
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Match patient profiles with ongoing clinical trials for rare diseases and connect with research institutions based on their needs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 max-w-3xl mx-auto">
              <div className="flex gap-3 mb-6">
                <Input 
                  placeholder="Search by condition, treatment, or location" 
                  className="flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? (
                    <>Searching...</>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trials section */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Featured Clinical Trials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trials.map((trial) => (
                <Card key={trial.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-50 text-primary rounded-full p-3">
                      <TestTube className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{trial.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {trial.phase}
                        </span>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                          {trial.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{trial.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Users className="h-4 w-4 mr-1" /> {trial.participants} participants
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Matching section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary-600 mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">AI-Powered Matching</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Personalized Trial Recommendations
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our advanced AI analyzes patient profiles, medical history, genetic markers, and geographical location to identify the most relevant clinical trials.
                </p>
                <Button>
                  Upload Patient Profile
                </Button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="rounded-lg overflow-hidden border shadow-sm h-72 w-full max-w-md bg-gray-100 flex items-center justify-center">
                  <span className="text-muted-foreground">AI Matching Visualization</span>
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

export default ClinicalTrials;
