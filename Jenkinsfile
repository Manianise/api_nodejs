pipeline {
    agent {
        label 'node_agent'  // Define your agent label here
    }
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')  // Docker Hub credentials (username/password)
        GIT_PRIVATE_KEY = credentials('git-private-key')  // Git SSH private key credentials
        SONAR_SCANNER_KEY = credentials('sonar-scanner-key')  // SonarQube scanner credentials (token)
        DOCKERHUB_USERNAME = 'your-docker-hub-username'  // Docker Hub username
        DOCKER_IMAGE_NAME = 'your-app-image'  // Docker image name
        MAILTRAP_SMTP_SERVER = 'smtp.mailtrap.io'  // Mailtrap SMTP server
        MAILTRAP_PORT = '2525'  // Mailtrap SMTP port
        MAILTRAP_USER = 'your-mailtrap-username'
        MAILTRAP_PASS = 'your-mailtrap-password'
    }
    
    stages {
        stage('Clone Git Repository') {
            steps {
                script {
                    sshagent(['git-private-key']) {
                        sh '''
                        git clone git@github.com:your-username/your-repo.git
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
                    cd your-repo
                    npm install
                    npm test
                    npm run build
                    '''
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {  // Make sure SonarQube is properly configured in Jenkins
                    script {
                        sh '''
                        cd your-repo
                        sonar-scanner \
                        -Dsonar.projectKey=your-project-key \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://your-sonarqube-url \
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
                    def newVersion = getVersion()

                    // Build Docker image
                    dockerImage = docker.build("${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${newVersion}")

                    // Tag Docker image with 'latest'
                    dockerImage.tag('latest')

                    // Push the Docker image to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        dockerImage.push("${newVersion}")
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
