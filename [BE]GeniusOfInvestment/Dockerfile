FROM openjdk:17-jdk-slim

ARG JAR_FILE=build/libs/*.jar
ARG JASYPT_KEY

ENV JASYPT_KEY=$JASYPT_KEY
# jar 파일 복제
COPY ${JAR_FILE} app.jar


# 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]