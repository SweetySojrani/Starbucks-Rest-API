
all: clean

clean: 
	find . -name 'gumball' -type f -exec rm -f {} \; 
	go clean

go-get:
	rm -rf src/github.com
	rm -rf src/gopkg.in
	go get -v github.com/codegangsta/negroni
	go get -v github.com/streadway/amqp
	go get -v github.com/gorilla/mux
	go get -v github.com/unrolled/render
	go get -v github.com/satori/go.uuid
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson

run:
	go run src/app/$(app).go

main:
	go run src/app/main.go

format:
	go fmt starbucks

install:
	go install starbucks

build:
	go build starbucks

start:
	./starbucks 

docker-build: 
	docker build -t starbucks .
	docker images

rabbitmq-run:
	docker run --name rabbitmq \
			   -d rabbitmq:3-management
mongodb-run:
	docker run --name mongodb -p 27017:27017 -d mongo

docker-run:
	docker run --name starbucks -p 3000:3000 -td starbucks
	docker ps

docker-network:
	docker network ls

docker-network-inspect:
	docker network inspect host

docker-shell:
	docker exec -it starbucks bash 

docker-clean:
	docker stop mongodb
	docker stop rabbitmq
	docker rm mongodb
	docker rm rabbitmq
	docker stop starbucks
	docker rm starbucks
	docker rmi starbucks

docker-ip:
	docker-machine ip

docker-ps:
	 docker ps --all --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t"

docker-ps-ports:
	 docker ps --all --format "table {{.Names}}\t{{.Ports}}\t"

test-ping:
	curl localhost:3000/ping

test-place-order:
	curl -X POST \
  http://localhost:3000/order \
  -H 'Content-Type: application/json' \
  -d '{"UserId": "vera", \
 "Items": [{ \
 	"Name": "Hot Coffee", \
 	"Price": "$3.5", \
 	"Quantity": 1 \
 }, \
 { \
 	"Name": "Cappucino", \
 	"Price": "$.0", \
 	"Quantity": 1 \
 }]}'


test-order-status:
	curl -X GET \
  http://localhost:3000/order \
  -H 'Content-Type: application/json'

test-process-order:
	curl -X POST \
  http://localhost:3000/orders \
  -H 'Content-Type: application/json'


##
## Docker Compose Deployment
##


up:
	docker-compose up -d

down:
	docker-compose down

network-ls:
	docker network ls

network-create:
	docker network create starbucks

network-prune:
	docker network prune
	

##
## Kubernetes Deployment
##

# Pod  

pod-create:
	kubectl create -f starbucks-pod.yaml

pod-get:
	kubectl get pods --namespace starbucks starbucks

pod-shell:
	kubectl exec  --namespace starbucks -it starbucks -- /bin/bash

pod-delete:
	kubectl delete pod --namespace starbucks starbucks

# Deployment

deployment-create:
	kubectl create -f starbucks-deployment.yaml --save-config 

deployment-get:
	kubectl get --namespace starbucks deployments

deployment-get-pods:
	kubectl get pods --namespace starbucks -l name=starbucks

deployment-pod-shell:
	kubectl exec  --namespace starbucks -it $(pod) -- /bin/bash

deployment-upgrade:
	kubectl apply --namespace starbucks -f starbucks-deployment.yaml

deployment-delete:
	kubectl delete deployment --namespace starbucks starbucks-deployment

# Service

service-create:
	kubectl create -f starbucks-service.yaml

service-get:
	kubectl get --namespace starbucks services

service-get-ip:
	kubectl get --namespace starbucks service starbucks-service -o wide

service-delete:
	kubectl delete --namespace starbucks service starbucks-service


