pipeline {

    agent any 

    stages {

        stage('checkout') { 

            steps {

                git url:'https://github.com/GitRep2018/insurance-claim-system-UI.git'

            }

        }

        
          stage('Build') { 

            steps {

                sh '''
              npm install
              ng build --base-href="./"

            '''

            }

        }
  stage('Deploy') { 

            steps {

                sh '''

                cd /var/lib/jenkins/workspace/ProjIng/dist

                chmod -R 777 ProjIng

                cp -rf ProjIng /opt/apache-tomcat-9.0.26/webapps/

            '''

            }

        }

    }

}
