
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlassCard from "@/components/ui/GlassCard";
import { Key, Save, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiSettings = () => {
  const [groqApiKey, setGroqApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Retrieve saved API key (for UI only, the actual key should be used server-side)
    const savedKey = localStorage.getItem("groqApiKey");
    if (savedKey) {
      setGroqApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!groqApiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter a valid Groq API key.",
      });
      return;
    }

    // In a real implementation, this would send the API key to your backend
    // The backend would store it securely and use it for API calls
    localStorage.setItem("groqApiKey", groqApiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your Groq API key has been saved successfully.",
    });
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary-600 mb-4">
              <Key className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">API Configuration</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Configure API Keys
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your API keys for integration with external services
            </p>
          </div>

          <div className="space-y-8">
            <GlassCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Groq AI API</h2>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  Required
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                The Groq API key is used for generating medical analysis and recommendations.
                You can obtain a key from <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Groq's Console</a>.
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={groqApiKey}
                    onChange={(e) => setGroqApiKey(e.target.value)}
                    placeholder="Enter your Groq API key"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleApiKeyVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    In a production environment, API keys should be stored securely on the server side.
                    This demo stores the key in your browser for demonstration purposes only.
                  </p>
                </div>
                
                <Button onClick={handleSaveApiKey} className="w-full sm:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save API Key
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiSettings;
