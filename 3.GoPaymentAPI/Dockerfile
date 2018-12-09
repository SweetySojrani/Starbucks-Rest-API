FROM golang:latest 
EXPOSE 5000
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
ENV GOPATH /app
RUN cd /app ; go install payment
CMD ["/app/bin/payment"]