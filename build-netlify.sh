#!/bin/bash

# Install all dependencies including dev dependencies
npm install

# Run the build process
npm run build

# Create dist directory if it doesn't exist
mkdir -p dist

# Make sure server files are properly copied to dist
cp -r node_modules dist/
