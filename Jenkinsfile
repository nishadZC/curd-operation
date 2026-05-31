pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        COMPOSE_DOCKER_CLI_BUILD = '1'
        DOCKER_BUILDKIT = '1'
        GIT_URL = 'https://github.com/VinayakNishad17/curd-operation.git'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    try {
                        checkout scm
                    } catch (err) {
                        echo "checkout scm failed: ${err}"
                        if (env.GIT_URL) {
                            echo "Falling back to explicit git clone from ${env.GIT_URL}"
                            sh '''
                                set -e
                                rm -rf *
                                git clone "$GIT_URL" .
                                if [ -n "$GIT_BRANCH" ]; then
                                  git checkout "$GIT_BRANCH"
                                elif [ -n "$BRANCH_NAME" ]; then
                                  git checkout "$BRANCH_NAME"
                                fi
                            '''
                        } else {
                            error("checkout scm failed and GIT_URL not set; configure job as Multibranch Pipeline or set GIT_URL in job environment")
                        }
                    }
                }
            }
        }

        stage('Install Dependencies') {
            agent { docker { image 'node:18' } }
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