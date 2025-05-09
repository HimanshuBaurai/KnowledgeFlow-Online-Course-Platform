# FROM node:22.15-alpine
# # Set the working directory
# WORKDIR /app
# # Copy package.json and package-lock.json
# COPY package.json ./
# # Install dependencies
# RUN npm install
# # Copy the rest of the application code
# COPY . .
# # Build the application
# RUN npm run build
# # Expose the application port
# EXPOSE 3000
# # Start the application
# CMD ["npm", "run", "start"]


# Trying multistage dockerfile to reduce size, currnetly its image is 1.47GB, now reduced to 96mb
# Stage 1: Build the React application
FROM node:22.15-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build
# Stage 2: Serve the production build with nginx
FROM nginx:alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
# EXPOSE 80
# here we are using nginx to serve the static files, thats why we exposed 80 instead of 3000 for react, as nginx will be running on port 80, we can later bind this to 3000:80 as needed in our docker compose file, so no difference in working for us
CMD ["nginx", "-g", "daemon off;"]