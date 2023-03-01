# build environment
FROM node:19.7.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./Frontend/package.json /app
COPY ./Frontend/package-lock.json /app
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY ./Frontend /app
RUN npm install
RUN npm run build
