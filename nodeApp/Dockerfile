FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./nodeApp/package*.json ./

RUN npm install -d -y
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./nodeApp .

#RUN npm run build-client

EXPOSE 8001
ENTRYPOINT [ "npm", "run", "docker_start" ]
