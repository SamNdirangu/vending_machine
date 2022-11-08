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
COPY --from=Builder /app/node_modules ./node_modules
COPY --from=Builder /app/dist ./dist

#Which port our app will expose
EXPOSE 80

#Command to run to start the container in production mode
CMD [ "node", "./dist/server.js" ]