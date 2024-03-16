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
					sh 'ls -al'
					sh './gradlew clean build'
                }
            }
        }
    }
}