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

    post {
        always {
            echo "Pipeline execution completed."
        }

        success {
            echo "SUCCESS: Docker images built and pushed successfully."
        }

        failure {
            echo "FAILURE: Pipeline execution failed. Check the logs."
        }

        unstable {
            echo "UNSTABLE: Some stages completed with warnings."
        }

        changed {
            echo "Build status changed compared to the previous build."
        }

        cleanup {
            echo "Cleaning up workspace..."
            cleanWs()
        }
    }
}