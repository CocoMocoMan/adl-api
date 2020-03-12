FROM node:10

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 80
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start