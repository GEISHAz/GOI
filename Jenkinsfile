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
					sh './gradlew clean build'
                }
            }
        }
		
		stage('Docker image build') {
            steps {
                dir('[BE]GeniusOfInvestment') {
                    sh "docker stop backend || true && docker rm backend || true"
                	sh 'docker rmi backend || true'
					sh 'docker build --build-arg JASYPT_KEY=${JASYPT_KEY} -t backend .'
                }
            }
        }
		
		stage('Docker container run') {
            steps {
                dir('[BE]GeniusOfInvestment') {
                    sh 'docker run -it -d -p 8080:8080 --name backend backend'
                }
            }
        }

        stage('Docker front image build') {
            steps {
                dir('[FE]front-end/dokkaebi') {
                    sh "docker stop frontend || true && docker rm frontend || true"
                    sh 'docker rmi frontend || true'
                    sh 'docker build -t frontend .'
                }
            }
        }

        stage('Docker front container run') {
            steps {
                dir('[FE]front-end') {
                    sh 'docker run -it -d -p 5173:80 --name frontend frontend'
                }
            }
        }

    }
}