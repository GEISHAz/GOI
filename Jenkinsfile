// pipeline {
//     agent any
//     stages {
//         stage('Gradle build'){
//             steps{
//                 dir('[BE]GeniusOfInvestment') {
//                     sh 'chmod +x ./gradlew'
//                     sh './gradlew clean build'
//                 }
//             }
//         }
//         stage('Docker build') {
//             steps {
//                 script {
//                     def jasyptKey = env.JASYPT_KEY
//                     sh "docker build --build-arg JASYPT_KEY=${jasyptKey} -t investment-backend:latest ./[BE]GeniusOfInvestment"
//                 }
//             }
//         }
//         stage('Docker run') {
//             steps {
//                 sh 'docker run -d --name investment-backend -p 8090:8090 investment-backend:latest'
//             }
//         }
//         stage('Remove Images'){
//             steps {
//                 sh 'docker container prune -f'
//                 sh 'docker image prune -f'
//             }
//         }
//     }
// }
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
                    sh './gradlew clean build -D JASYPT_KEY=$JASYPT_KEY'
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