// This file helps manage environment variables for Netlify deployment
// It will be used in your build process

require('dotenv').config();

// You can add default values for your environment variables here
// These will be used if the actual environment variables are not set
module.exports = {
  // Database connection - you'll need to set this in Netlify's environment variables
  DATABASE_URL: process.env.DATABASE_URL || "YOUR_POSTGRES_CONNECTION_STRING",
  
  // Server configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "production",
  
  // Add any other environment variables your app needs
};