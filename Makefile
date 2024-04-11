IMAGE_NAME = review-app

CONTAINER_NAME = review-app

run:
	sudo docker build -t ${IMAGE_NAME} .
	sudo docker stop ${CONTAINER_NAME} || true
	sudo docker rm ${CONTAINER_NAME} || true
	sudo docker run --name ${CONTAINER_NAME} --add-host host.docker.internal:host-gateway -e NODE_ENV=local -p 4000:4000 -d ${IMAGE_NAME} 