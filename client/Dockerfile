# Step 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Build the Vite React app
RUN pnpm build

# Step 2: Serve with Nginx
FROM node:18-alpine

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "dev"]