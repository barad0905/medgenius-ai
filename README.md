
# MedAI Platform

A React-based medical AI platform providing features like patient analysis, disease prediction, and drug recommendations.

## Features

- 🔒 Secure authentication system
- 👤 Patient analysis with genetic profiles
- 🔬 Disease prediction based on patient data
- 💊 AI-powered drug recommendations
- 🧬 Clinical trial matching
- 📊 Side effects analysis

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui Components
- React Router DOM
- Recharts for data visualization

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

```bash
# Clone this repository
git clone <repository-url>

# Navigate to project directory
cd medai-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Keys Setup

This application requires the following API keys:

- **Groq AI API Key**: Used for generating medical recommendations and analysis. You can obtain a key from [Groq's Console](https://console.groq.com/keys).

API keys are stored securely in the browser's local storage and are never exposed in the application code.

## Demo Credentials

For testing purposes, you can use these demo credentials:

- Email: `demo@example.com`
- Password: `password123`

## Project Structure

- `src/`
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `lib/`: Utility functions
  - `pages/`: Main application pages
  - `utils/`: Helper utilities

## Security Notes

- This demo uses localStorage for authentication. In a production environment, use a proper authentication system with JWT or similar.
- API keys are stored in localStorage for demonstration. In production, API calls should be proxied through a secure backend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
