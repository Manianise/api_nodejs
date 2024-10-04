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
        LATEST_VERSION = sh(returnStdout: true, script: "git tag --sort version:refname |  sed 's/^v//' | tail -1").trim()
    }
    
    stages {

        stage('Install, Test connexion') {
            steps {
                script {
                    sh '''
                    export MARIADB_HOST=172.18.0.2
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
                        -Dsonar.host.url=http://172.18.0.4:9000 \
                        -Dsonar.login=${SONAR_SCANNER_KEY}
                        '''
                    }
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {

                    sh '''
                    docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKER_HUB_CREDENTIALS}
                    docker build . -t ${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${LATEST_VERSION}
                    docker push ${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${LATEST_VERSION}
                    '''

                }
            }
        }
    }

    post {
        failure{
            mail bcc: '', 
            body: 'Une erreur est survenue : Erreur dans le build', 
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
