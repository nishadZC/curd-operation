pipeline {
    agent any

    options {
        timestamps()
    }

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        BACKEND_IMAGE = '368763425814.dkr.ecr.ap-south-1.amazonaws.com/backend'
        FRONTEND_IMAGE = '368763425814.dkr.ecr.ap-south-1.amazonaws.com/frontend'
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
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        set -e

                        export AWS_DEFAULT_REGION=ap-south-1

                        if ! aws ecr describe-repositories --repository-names backend >/dev/null 2>&1; then
                            aws ecr create-repository --repository-name backend || true
                        fi

                        if ! aws ecr describe-repositories --repository-names frontend >/dev/null 2>&1; then
                            aws ecr create-repository --repository-name frontend || true
                        fi

                        aws ecr get-login-password --region ap-south-1 | \
                        docker login --username AWS --password-stdin \
                        368763425814.dkr.ecr.ap-south-1.amazonaws.com

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
