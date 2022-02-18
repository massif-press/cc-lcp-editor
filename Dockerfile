FROM node:16-alpine3.15

RUN apk add nginx
RUN adduser -D -g 'www' www
RUN mkdir /www
RUN chown -R www:www /var/lib/nginx
RUN chown -R www:www /www

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY . .

RUN npm run build

RUN cp -R ./dist/* /www

COPY nginx-siteconfig.conf /etc/nginx/http.d/

EXPOSE 8000

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]