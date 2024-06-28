# Use an official Node.js runtime as a parent image
FROM node:14

WORKDIR /usr/src/app
# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install a simple web server
RUN npm install -g http-server

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the web server on container startup
CMD [ "http-server", ".", "-p", "3000" ]

