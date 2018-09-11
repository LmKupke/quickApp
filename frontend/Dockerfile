# Create image based on the offical Node 8 image file

FROM node:8.11

# Create a directory where app wil be placed
RUN mkdir -p /usr/src/app

#Change directory so that our commands run inside the app
WORKDIR /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
