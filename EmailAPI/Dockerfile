# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install your application's dependencies
RUN npm install

# Copy the rest of your application to the container
COPY . .

# Expose the port your application will listen on
EXPOSE 8003

# Define the command to run your application
CMD [ "node", "sendEmail.js" ]
