pipeline {
    agent any

    stages {
        stage('Gradle build') {
            steps {
                dir('[BE]GeniusOfInvestment') {
                    sh 'chmod +x ./gradlew'
                    // 환경 변수 JASYPT_KEY 값을 직접 사용
                    sh './gradlew clean build -PJASYPT_KEY=$JASYPT_KEY'
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
    }
}