pipeline {
    agent any

    options {
        timestamps()
    }

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        BACKEND_IMAGE = "${env.BACKEND_IMAGE}"
        FRONTEND_IMAGE = "${env.FRONTEND_IMAGE}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh '''
                    set -e

                    cd back-end
                    npm ci
                    node --check server.js

                    cd ../frontend
                    npm ci
                    npm run build
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                    set -e

                    docker build -t "${BACKEND_IMAGE}:${BUILD_NUMBER}" ./back-end
                    docker build -t "${FRONTEND_IMAGE}:${BUILD_NUMBER}" ./frontend
                '''
            }
        }

        stage('Push Images') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
                    sh '''
                        set -e

                        docker tag "${BACKEND_IMAGE}:${BUILD_NUMBER}" "${BACKEND_IMAGE}:latest"
                        docker tag "${FRONTEND_IMAGE}:${BUILD_NUMBER}" "${FRONTEND_IMAGE}:latest"

                        docker push "${BACKEND_IMAGE}:${BUILD_NUMBER}"
                        docker push "${BACKEND_IMAGE}:latest"

                        docker push "${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                        docker push "${FRONTEND_IMAGE}:latest"
                    '''
                }
            }
        }
    }
}
