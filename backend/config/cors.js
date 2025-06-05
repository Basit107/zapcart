// CORS configuration for the backend API// This configuration allows the frontend React app to communicate with the backend API
// while adhering to CORS (Cross-Origin Resource Sharing) policies.

const allowedOrigins = [
    'http://localhost:3000', // React app running on localhost
    'http://localhost:5000', // Backend API running on localhost
    'http://localhost:3100', // Another local development server, if needed
    // 'https://your-production-domain.com', // Replace with your production domain
];


export const corsOptions = {
    origin: allowedOrigins, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    preflightContinue: false, // Pass the CORS preflight response to the next handler
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'], // Headers exposed to frontend

}