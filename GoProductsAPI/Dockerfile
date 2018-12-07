FROM golang:latest 
EXPOSE 3000
RUN mkdir /app 
ADD ./src/goapi /app/src/goapi
WORKDIR /app 
ENV GOPATH /app
RUN cd /app && \
      go get github.com/codegangsta/negroni && \
      go get github.com/gorilla/mux && \
      go get github.com/unrolled/render && \
      go get gopkg.in/mgo.v2 && \
      go install goapi
CMD ["/app/bin/goapi"]
