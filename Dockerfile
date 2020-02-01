FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Bundle app source
COPY . .

# If you are building your code for production
RUN npm install

# Setup app environment variables
ENV NODE_ENV='production'
ENV PORT='3000'

CMD [ "npm", "start" ]
