pipeline {
    agent any

    options {
        timestamps()
    }

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '368763425814.dkr.ecr.ap-south-1.amazonaws.com'

        BACKEND_IMAGE = "${ECR_REGISTRY}/backend"
        FRONTEND_IMAGE = "${ECR_REGISTRY}/frontend"
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

                    docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./back-end
                    docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend

                    docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest
                    docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-access-key']
                ]) {
                    sh '''
                        set -e

                        aws sts get-caller-identity

                        aws ecr describe-repositories --repository-names backend >/dev/null 2>&1 || \
                        aws ecr create-repository --repository-name backend

                        aws ecr describe-repositories --repository-names frontend >/dev/null 2>&1 || \
                        aws ecr create-repository --repository-name frontend

                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${BACKEND_IMAGE}:latest

                        docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${FRONTEND_IMAGE}:latest
                    '''
                }
            }
        }
    }
}