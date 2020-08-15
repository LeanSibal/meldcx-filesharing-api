# Check out https://hub.docker.com/_/node to select a new base image
FROM node:lts-alpine3.12

# Create app directory (with user `node`)
RUN mkdir -p /usr/app

WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . /usr/app

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "nodemon" ]
