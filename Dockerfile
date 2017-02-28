# Dockerfile
# using debian:jessie for it's smaller size over ubuntu
FROM httpd

ADD www/ /usr/local/apache2/htdocs/

VOLUME ['/usr/local/apache2/htdocs/maps']

#Expose the port
EXPOSE 8080
EXPOSE 80

