FROM mysql:5.7

ENV MYSQL_DATABASE adldb
ENV MYSQL_ROOT_PASSWORD password 
ENV MYSQL_PASSWORD password

COPY ./scripts/ /docker-entrypoint-initdb.d/
