FROM node:16-alpine3.15

WORKDIR /usr/app/

RUN apk add nginx
RUN adduser -D -g 'www' www
RUN mkdir /www
RUN chown -R www:www /var/lib/nginx
RUN chown -R www:www /www

COPY nginx-siteconfig.conf /etc/nginx/http.d/

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN mkdir -p /usr/app/src
RUN mkdir -p /usr/app/public

COPY src ./src
COPY public ./public
COPY vue.config.js .
COPY babel.config.js .
COPY tsconfig.json .

RUN npm run build

RUN cp -R ./dist/* /www

EXPOSE 8000

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]