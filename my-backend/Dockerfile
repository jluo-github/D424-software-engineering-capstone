

# Dockerfile for Spring Boot backend
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean install

FROM eclipse-temurin:17-jdk
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "app.jar"]




# push to dockerhub jluo23/myproject repo:

# docker tag myproject jluo23/myproject
# docker push jluo23/myproject

# amazon:
#sudo sh
#yum install -y docker
#service docker start
#docker infor

#pull instance from dockerhub and deploy in a container in amazon:

#docker login
#username: jluo23
#password: ********
#docker pull jluo23/myproject
#docker images

#docker run -d --name aws-application -p 80:8080 jluo23/myproject



