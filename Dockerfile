# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local build folder to the container
COPY BuildMeteora ./BuildMeteora

# Expose the port your app runs on
EXPOSE 3006

# Command to run your application
CMD ["serve -p 3006"]
