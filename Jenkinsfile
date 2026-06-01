pipeline {
    agent any

    options {
        timestamps()
    }

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        BACKEND_IMAGE = 'nishadzc/curd-operation-backend'
        FRONTEND_IMAGE = 'nishadzc/curd-operation-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Verify Branch') {
            steps {
                script {
                    if (env.BRANCH_NAME != 'task_4') {
                        error("This pipeline only runs for task_4 branch")
                    }
                }
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        set -e
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker tag "${BACKEND_IMAGE}:${BUILD_NUMBER}" "${BACKEND_IMAGE}:latest"
                        docker tag "${FRONTEND_IMAGE}:${BUILD_NUMBER}" "${FRONTEND_IMAGE}:latest"

                        docker push "${BACKEND_IMAGE}:${BUILD_NUMBER}"
                        docker push "${BACKEND_IMAGE}:latest"
                        docker push "${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                        docker push "${FRONTEND_IMAGE}:latest"

                        docker logout
                    '''
                }
            }
        }
    }
}