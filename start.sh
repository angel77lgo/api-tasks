docker run -p 27017:27017 --name -d mongo:latest
tsc -w &
node build/index.js
