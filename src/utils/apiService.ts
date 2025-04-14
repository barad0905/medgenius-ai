
import { API_CONFIG } from "../config/api";
import { toast } from "@/hooks/use-toast";

interface GroqRequestOptions {
  prompt: string;
  systemMessage?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Make a request to the Groq AI API
 */
export const fetchGroqAI = async ({
  prompt,
  systemMessage = "You are a helpful medical AI assistant providing accurate and useful information.",
  model = "llama3-70b-8192",
  temperature = 0.3,
  maxTokens = 2048
}: GroqRequestOptions) => {
  try {
    // In production, this should be a server-side API call to protect your API key
    const response = await fetch(API_CONFIG.GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_CONFIG.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API error:", errorData || response.statusText);
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    toast({
      variant: "destructive",
      title: "API Error",
      description: error instanceof Error ? error.message : "Failed to connect to AI service"
    });
    throw error;
  }
}

/**
 * Helper function to parse JSON from AI responses
 */
export const parseAIResponse = (content: string) => {
  try {
    // Try to extract JSON from the response which might be markdown formatted
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                     content.match(/```\n([\s\S]*?)\n```/) ||
                     content.match(/{[\s\S]*}/);
    
    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
    return JSON.parse(jsonStr.trim());
  } catch (jsonError) {
    console.error("Error parsing JSON from AI response:", jsonError);
    throw new Error("Could not parse response from AI service");
  }
}

/**
 * Process any string fields that might be JSON
 */
export const deepParseJsonStrings = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    try {
      // Try to parse it as JSON
      return JSON.parse(obj);
    } catch (e) {
      // If it's not valid JSON, return the original string
      return obj;
    }
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepParseJsonStrings(item));
  }
  
  if (typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = deepParseJsonStrings(value);
    }
    return result;
  }
  
  // For numbers, booleans, etc., return as is
  return obj;
};
