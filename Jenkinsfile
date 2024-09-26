pipeline {
    agent {
        label 'node-agent'  
    }
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('jenkins-id	')
        GIT_PRIVATE_KEY = credentials('ssh-connexion')
        SONAR_SCANNER_KEY = credentials('sonar-scanner-token')  
        DOCKERHUB_USERNAME = 'mechameleon'  
        DOCKER_IMAGE_NAME = 'api_nodejs'  
        MAILTRAP_SMTP_SERVER = 'sandbox.smtp.mailtrap.io'  
        MAILTRAP_PORT = '587' 
        MAILTRAP_USER = '0e63983bdc019a'
        MAILTRAP_PASS = credentials('mailtrap-pwd')
    }
    
    stages {
        stage('Clone Git Repository') {
            steps {
                script {
                    sshagent(['git-private-key']) {
                        sh '''
                        git clone git@github.com:Manianise/api_nodejs.git
                        cd your-repo
                        '''
                    }
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
    }

    post {
        success {
            mail to: 'recipient@example.com',
                 subject: 'Build Success',
                 body: "The build was successful",
                 from: 'jenkins@example.com',
                 smtpHost: MAILTRAP_SMTP_SERVER,
                 smtpPort: MAILTRAP_PORT,
                 replyTo: 'no-reply@example.com',
                 username: MAILTRAP_USER,
                 password: MAILTRAP_PASS
        }
        failure {
            mail to: 'recipient@example.com',
                 subject: 'Build Failed',
                 body: "The build has failed",
                 from: 'jenkins@example.com',
                 smtpHost: MAILTRAP_SMTP_SERVER,
                 smtpPort: MAILTRAP_PORT,
                 replyTo: 'no-reply@example.com',
                 username: MAILTRAP_USER,
                 password: MAILTRAP_PASS
        }
    }
}
