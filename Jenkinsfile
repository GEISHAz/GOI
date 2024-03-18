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
					sh 'docker build --build-arg JASYPT_KEY=${JASYPT_KEY} -t backend .'
                }
            }
        }
		
		stage('Docker container run') {
            steps {
                dir('[BE]GeniusOfInvestment') {
				    sh 'docker rm -f backend'
					sh 'docker run -it -d -p 8080:8080 --name backend backend'
                }
            }
        }
    }
}