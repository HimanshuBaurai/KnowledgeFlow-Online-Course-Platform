FROM node:22.15-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json ./
# Run npm install
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the application port
EXPOSE 4000
# Start the application
CMD ["npm", "run", "start"]