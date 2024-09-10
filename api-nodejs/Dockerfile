# Use an official Node.js runtime as a parent image
FROM node:slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to migrate to a database
RUN node config.js \
sequelize db:migrate

# Command to run the application
CMD ["npm", "run", "start"]
