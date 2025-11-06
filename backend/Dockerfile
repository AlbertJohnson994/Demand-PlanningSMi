FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Build Nest project
RUN npm run build

# Create database directory and set permissions
RUN mkdir -p /app/data && chown -R node:node /app

# Switch to non-root user
USER node

# Expose backend port
EXPOSE 3001

# Start backend in production
CMD ["npm", "run", "start:prod"]