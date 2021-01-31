FROM node:12.16.3-slim

WORKDIR /app

# install dependencies
COPY package.json package-lock.json /app/
RUN npm ci

# copy all other files
COPY . /app

# build the application
RUN npm run build

EXPOSE 80

# run the application
CMD ["node", "dist/src/main.js"]