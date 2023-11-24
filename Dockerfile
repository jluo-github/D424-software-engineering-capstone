
# Stage 1: Build React App
# React Frontend Dockerfile
FROM node:16-alpine AS react-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend . 
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=react-build /app/build /app/build
RUN npm install -g http-server
EXPOSE 80
CMD ["http-server", "-p", "80", "./build"]

# Stage 2: Build Java Spring Boot App

# Dockerfile for Spring Boot backend
FROM maven:3.8.3-openjdk-17 AS spring-build
WORKDIR /app
COPY backend .
RUN mvn clean install

# Stage 3: Build MySQL Database
# Build MySQL Database
FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=pc_shop
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=1234
VOLUME /var/lib/mysql

# Stage 4: Build Docker Image

FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=react-build /app/build /app/src/main/resources/static

COPY --from=spring-build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar", "app.jar"]

# docker build -t v2capstone:v2capstone .


# docker run -p 8080:8080 -it v2capstone:v2capstone
