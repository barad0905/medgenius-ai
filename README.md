
# MedAI Platform

A React-based medical AI platform providing features like patient analysis, disease prediction, and drug recommendations.

## Features

- 🔒 Secure authentication system
- 👤 Patient analysis with genetic profiles
- 🔬 Disease prediction based on patient data
- 💊 AI-powered drug recommendations
- 🧬 Drug discovery with molecular analysis
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

This application uses the Groq AI API for generating medical recommendations and analysis.

### Configuration Steps:

1. Obtain a Groq API key from [Groq's Console](https://console.groq.com/keys)
2. In a production environment, store this key in server-side environment variables
3. For development, you can enter your API key in the API Settings page of the application

## Server-Side Implementation

In a production environment, you should implement:

1. A secure backend service that stores API keys in environment variables
2. Proper authentication and session management
3. API endpoint proxying to keep sensitive keys secure

Example `.env` file structure for your backend:
```
GROQ_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
```

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
- For production deployment, implement proper API key management through environment variables on your server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
