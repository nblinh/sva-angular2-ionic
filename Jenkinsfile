#!/usr/bin/groovy

@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def utils = new io.fabric8.Utils()


clientsNode {
  
  def newVersion = ''

  checkout scm

  stage 'Canary release'
  echo 'NOTE: running pipelines for the first time will take longer as build and base docker images are pulled onto the node'
  if (!fileExists ('Dockerfile')) {
    writeFile file: 'Dockerfile', text: 'FROM httpd'
  }

  newVersion = performCanaryRelease {}

  def rc = """
    {
  "kind": "Deployment",
  "apiVersion" : "extensions/v1beta1",
  "metadata": {
    "labels": {
      "project": "${env.JOB_NAME}"
    },
    "name": "${env.JOB_NAME}"
  },
  "spec": {
    "selector": {
      "matchLabels": {
        "project": "${env.JOB_NAME}",
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "project": "${env.JOB_NAME}"
        }
      },
      "spec": {
        "containers": [
          {
            "image": "${env.FABRIC8_DOCKER_REGISTRY_SERVICE_HOST}:${env.FABRIC8_DOCKER_REGISTRY_SERVICE_PORT}/${env.KUBERNETES_NAMESPACE}/${env.JOB_NAME}:${newVersion}",
            "imagePullPolicy": "IfNotPresent",
            "name": "${env.JOB_NAME}",
            "ports": [
              {
                "containerPort": 80,
                "name": "http",
                "protocol": "TCP"
              }
            ],
            "volumeMounts": [
              {
                "mountPath": "/usr/local/apache2/htdocs/maps",
                "name": "sva-map"
              }
            ]
          }
        ],
        "volumes": [
          {
            "name": "sva-map",
            "persistentVolumeClaim": {
              "claimName": "sva-map-volume"
            }
          }
        ]
      }
    }
  }
}
    """

  stage 'Rollout Staging'
  def envStage = utils.environmentNamespace("staging")
  kubernetesApply(file: rc, environment: envStage)
}
