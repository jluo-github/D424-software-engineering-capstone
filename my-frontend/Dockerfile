

# FROM node:lts 
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]


# React Frontend Dockerfile
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g http-server
EXPOSE 80
CMD ["http-server", "-p", "80", "./build"]






# FROM nginx:alpine 
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
