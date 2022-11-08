#Get our base image and use a s a builder
FROM node:16.14.0-alpine as Builder

#Set our Working Directory
WORKDIR /app

#copy our package.json files to our working directory
COPY package*.json .

#Install our dependancies
RUN npm install

# Copy now the rest of our files
COPY . ./

# Build our app
RUN npm run build

# Remove development dependancies
RUN npm prune --production

#--------------------------------------------
FROM node:16.14.0-alpine
#Set our Working Directory
WORKDIR /app
# copy from build image
COPY --from=Builder /usr/src/app/dist ./dist
COPY --from=Builder /usr/src/app/node_modules ./node_modules

#Which port our app will expose
EXPOSE 80


#Command to run to start the container in production mode
CMD [ "node", "./dist/server.js" ]

#Command Summary to run on windows
# Run in detached mode -d
# name of container --name nodets
# Map external port 3000 to container port 80 -p 3000:80
# Bind our volume for dev purposes with readonly ro -v ${pwd}:/app:ro
# Prevent binding our node_modules folder -v /app/node_modules

# docker run -d --name nodets -p 3000:80 -v ${pwd}:/app:ro -v /app/node_modules nodets