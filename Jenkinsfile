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
					sh 'cat ./[BE]GeniusOfInvestment/src/main/resources/application.yml'
					sh "sed -i 's/\${JASYPT_KEY}/${JASYPT_KEY}/' ./[BE]GeniusOfInvestment/src/main/resources/application.yml"
					sh 'cat ./[BE]GeniusOfInvestment/src/main/resources/application.yml'
                }
            }
        }
    }
}