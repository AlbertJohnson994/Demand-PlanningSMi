FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create src/data directory if it doesn't exist
RUN mkdir -p src/data

# Build Next.js project
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start frontend
CMD ["npm", "start"]