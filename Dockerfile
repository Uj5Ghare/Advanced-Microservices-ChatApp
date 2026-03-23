# Dockerfile

# Stage 1: Build the application
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Build the application (if applicable, for example, if using TypeScript)
# RUN npm run build

# Stage 2: Create the production image
FROM node:14

# Set working directory
WORKDIR /app

# Copy only the necessary artifacts from the build stage
COPY --from=build /app .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD [ "node", "server.js" ]  # Change "server.js" to the main entry point of your application
