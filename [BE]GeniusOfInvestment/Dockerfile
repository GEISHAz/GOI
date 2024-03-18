FROM openjdk:17-jdk-slim

ARG JAR_FILE=build/libs/*SNAPSHOT.jar
ARG JASYPT_KEY

ENV JASYPT_KEY=$JASYPT_KEY
# jar 파일 복제
COPY ${JAR_FILE} app.jar

EXPOSE 8080
# 실행 명령어
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-DJASYPT_KEY=${JASYPT_KEY}", "-jar", "app.jar"]