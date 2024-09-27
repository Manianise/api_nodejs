pipeline {
    agent {
        label 'node-agent'  
    }
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('jenkins-id	')
        SONAR_SCANNER_KEY = credentials('sonar-scanner-token')  
        DOCKERHUB_USERNAME = 'mechameleon'  
        DOCKER_IMAGE_NAME = 'api_nodejs'   
    }
    
        stage('Install, Test and Build Node.js App') {
        steps {
            script {
                sh '''
                    git clone https://github.com/Manianise/api_nodejs.git
                '''
            }
        }
    }
    
    stage('Install, Test and Build Node.js App') {
        steps {
            script {
                sh '''
                npm install
                npm run build
                '''
            }
        }
    }

    stage('Testing build') {
        steps {
            script {
                sh 'npm run test'
            }
        }
    }

    stage('SonarQube Scan') {
        steps {
            withSonarQubeEnv('SonarQube') {
                script {
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=node-api-scan \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=172.18.0.3:9000 \
                    -Dsonar.login=${SONAR_SCANNER_KEY}
                    '''
                }
            }
        }
    }

    stage('Build and Push Docker Image') {
        when { tag "release-*" }
        steps {
            script {
                def dockerImage
                def latestVersion = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()

                // Build Docker image
                dockerImage = docker.build("${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${latestVersion}")

                // Tag Docker image with 'latest'
                dockerImage.tag('latest')

                // Push the Docker image to Docker Hub
                docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                    dockerImage.push("${latestVersion}")
                    dockerImage.push('latest')
                }
            }
        }
    }

    post {
        success {
            echo 'success'
        }
        failure {
            echo 'failure'
        }
    }
}


