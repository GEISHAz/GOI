pipeline {
    agent any

    environment {
        JASYPT_KEY = credentials('JASYPT_KEY')
    }

    stages {
        stage('Gradle build') {
            steps {
                dir('[BE]GeniusOfInvestment') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean build -DJASYPT_KEY=${JASYPT_KEY}'
                }
            }
        }
        stage('Docker Compose build') {
            steps {
                script {
                    // Docker Compose를 사용하여 서비스 빌드 및 실행
                    sh 'Deploy/docker-compose up -d'
                }
            }
        }
        stage('Remove Images') {
            steps {
                script {
                    sh 'docker image prune -f'
                }
            }
        }
// 서비스 종료시
//         stage('Stop CICD') {
//             steps {
//                 script {
//                     // Docker Compose를 사용하여 서비스 중지 및 관련 리소스 정리
//                     sh 'docker-compose down'
//                 }
//             }
//         }
    }
}