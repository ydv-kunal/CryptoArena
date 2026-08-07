# Step 1: Use the official Node.js version 20 image as our runtime base.
FROM node:20

# Step 2: Set the folder inside the container where our Market service files will reside.
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies.
COPY package*.json ./

# Step 4: Run npm install to install all dependencies required for the Market service & WebSockets.
RUN npm install

# Step 5: Copy the rest of the Market service codebase into the container.
COPY . .

# Step 6: Document that the Market service listens on port 5103.
EXPOSE 5103

# Step 7: Run the Market server script (REST & WebSocket Broadcaster) when the container boots.
CMD ["node", "index.js"]

