
// Base URLs for different APIs
export const API_CONFIG = {
  // In a production environment, this would come from environment variables
  GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",
  
  // For demo purposes, we're using a hardcoded API key
  // In production, this should be in server-side environment variables
  // NEVER expose API keys in client-side code in production!
  GROQ_API_KEY: "demo-groq-api-key-abc123"
};
