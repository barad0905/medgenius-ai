
// Helper function to safely parse any JSON strings within an object recursively
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

// Helper function to safely stringify objects that might be directly rendered
export const safelyRenderValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};
