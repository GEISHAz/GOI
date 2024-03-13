pipeline {         
    agent none
    stages { 
        stage('Gradle build'){
            agent any
            steps{
                dir('[BE]GeniusOfInvestment') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean build'
                }
            }
        }             
        stage('Docker build') {
            agent any
            steps {                                                     
                script {
                    def jasyptKey = env.JASYPT_KEY
                    sh "docker build --build-arg JASYPT_KEY=${jasyptKey} -t investment-backend:latest ./[BE]GeniusOfInvestment"
                }
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker run -d --name investment-backend -p 8090:8090 investment-backend:latest'
            }
        }
        stage('Remove Images'){
            agent any
            steps {
                sh 'docker container prune -f'
                sh 'docker image prune -f'
            }
        }
    }
}
