pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        COMPOSE_DOCKER_CLI_BUILD = '1'
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    set -e
                    cd back-end
                    npm ci

                    cd ../frontend
                    npm ci
                '''
            }
        }

        stage('Validate Code') {
            steps {
                sh '''
                    set -e
                    cd back-end
                    node --check server.js

                    cd ../frontend
                    npm run build
                '''
            }
        }

        stage('Validate Compose') {
            steps {
                sh 'docker compose -f docker-compose.yml config'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose -f docker-compose.yml build'
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                    branch 'docker-conf'
                }
            }
            steps {
                sh 'docker compose -f docker-compose.yml up -d --remove-orphans'
            }
        }
    }

    post {
        always {
            sh 'docker compose -f docker-compose.yml ps || true'
        }
    }
}