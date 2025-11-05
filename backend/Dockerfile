FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build Nest project
RUN npm run build

# Expose backend port
EXPOSE 3001

# Start backend
CMD ["node", "dist/main.js"]