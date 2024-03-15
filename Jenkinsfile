pipeline {
    agent any

    stages {
        stage('Gradle build') {
            steps {
                dir('[BE]GeniusOfInvestment') {
                    sh 'chmod +x ./gradlew'
                    sh "sed -i 's/\${JASYPT_KEY}/${JASYPT_KEY}/' ./src/main/resources/application.yml"
                    sh './gradlew clean build'
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
        stage('Deploy'){
            steps{
                dir('server'){
                    script{
                        sh 'docker build --build-arg JASYPT_KEY=${JASYPT_KEY} -t backend-jenkins .'
                        sh 'docker rm -f backend-jenkins'
                        sh 'docker run -d --name backend-jenkins -p 8080:8080 backend-jenkins'
                    }
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