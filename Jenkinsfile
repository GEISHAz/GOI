pipeline {
    agent any

    environment {
        JASYPT_KEY = credentials('JASYPT_KEY_CREDENTIAL_ID')
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
					sh 'docker build -t backend .'
                }
            }
        }
    }
}