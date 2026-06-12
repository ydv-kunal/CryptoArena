# Step 1: Use the official Node.js version 20 image as our runtime base.
FROM node:20

# Step 2: Set the folder inside the container where our Trading service files will reside.
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to install dependencies.
COPY package*.json ./

# Step 4: Run npm install to install all the dependencies required for the Trading service.
RUN npm install

# Step 5: Copy the rest of the Trading service codebase into the container.
COPY . .

# Step 6: Document that the Trading service listens on port 5102.
EXPOSE 5102

# Step 7: Run the Trading server script when the container boots.
CMD ["node", "index.js"]
