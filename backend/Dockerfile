
# Dockerfile for Spring Boot backend
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean install

FROM eclipse-temurin:17-jdk
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "app.jar"]


# push to dockerhub:
# docker build -t jluo23/v2capstone:backend .
# docker push jluo23/v2capstone:backend


#
# # docker build -t v2capstone:v2capstone .
# # docker run -p 8080:8080 -it v2capstone
#