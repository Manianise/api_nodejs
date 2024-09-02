pipeline {
    agent {
        label 'agent_node'
    }
    environment {
        SONAR_SCANNER = credentials('scanner_key'),
        DOCKER_HUB_PAT = credentials('docker_hub_pat')

    }
    stages {
        stage('clone') {
            steps {
                git branch: 'main', url: 'git@github.com:Manianise/cbtLaClefAPI.git'
            }
        }
        stage('install') {
            steps {
                sh '''
                    npm install --production
                    npm run test
                    npm run build
                '''
            }
        }
        stage('delivery') {
            steps {
                sh '''
                    docker login -u mechameleon -p ${DOCKER_HUB_PAT}
                    docker build  . -t mechameleon/clc_api:${BUILD_ID}
                    docker push mechameleon/clc_api:${BUILD_ID}
                '''
            }
        }
        post{
            failure {
                echo 'failure'
            }
            success {
                echo 'success'
            }
        }
    }
}

