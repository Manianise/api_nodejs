pipeline {
    agent {
        label 'node-agent'  
    }
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('jenkins-id')
        SONARQUBE_SCANNER = tool name: 'SonarQube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        SONAR_SCANNER_KEY = credentials('sonar-scanner')  
        DOCKERHUB_USERNAME = 'mechameleon'  
        DOCKER_IMAGE_NAME = 'api_nodejs'
        ADMIN_MAIL = credentials('admin_mail')
        LATEST_VERSION = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
    }
    
    stages {
        
        stage('Install, Test connexion') {
            steps {
                script {
                    sh '''
                    export MARIADB_HOST=172.18.0.10
                    npm install
                    npm run test
                    nohup npm run build > output.log 2>&1 &
                    '''
                }
            }
        }


        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        sh '''
                        ${SONARQUBE_SCANNER}/bin/sonar-scanner \
                        -Dsonar.projectKey=node-api-scan \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://172.18.0.3:9000 \
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

                    // Build Docker image
                    dockerImage = docker.build("${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${latestVersion}")

                    // Tag Docker image with 'latest'
                    dockerImage.tag('latest')

                    // Push the Docker image to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        dockerImage.push("${LATEST_VERSION}")
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        failure{
            mail bcc: '', 
            body: 'Une erreur est survenue', 
            cc: '', from: 'Jenkins pipelines ', 
            replyTo: '', 
            subject: "Failure to build : ${DOCKER_IMAGE_NAME} - Build # ${LATEST_VERSION} !", 
            to: "${ADMIN_MAIL}"
          }
        success{
            mail bcc: '', 
            body: 'Le build a été créé avec succès', cc: '', 
            from: 'Jenkins pipelines', 
            replyTo: '', 
            subject: "Successefully pushed : ${DOCKER_IMAGE_NAME} - Build # ${LATEST_VERSION} !", 
            to: "${ADMIN_MAIL}"
           }
        }
}
