# Step 1: Use the official Node.js version 20 image. This sets up the Node runtime environment.
FROM node:20

# Step 2: Set the folder inside the container where our app files will live.
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json first to install dependencies.
# We do this separately so that Docker caches the installed packages and builds faster.
COPY package*.json ./

# Step 4: Run npm install to download and install all the project dependencies.
RUN npm install

# Step 5: Copy the rest of the project files from our computer into the container.
COPY . .

# Step 6: Define variables that we need during build time (API and WebSocket URLs).
ARG VITE_API_URL
ARG VITE_WS_URL

# Step 7: Inject those build-time variables into the container environment so Vite can read them.
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WS_URL=$VITE_WS_URL

# Step 8: Document that our React/Vite development server listens on port 5173.
EXPOSE 5173

# Step 9: Start the Vite development server.
# The "--host" flag is critical because it tells Vite to accept connections from outside the container.
CMD ["npm", "run", "dev", "--", "--host"]
