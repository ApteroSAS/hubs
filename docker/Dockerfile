FROM nginx:alpine
RUN mkdir /usr/share/nginx/html/data
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./www /usr/share/nginx/html
 