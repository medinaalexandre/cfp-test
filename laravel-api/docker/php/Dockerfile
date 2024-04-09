FROM php:8.2-fpm-alpine

RUN apk update && apk --no-cache add bash

RUN apk add --no-cache postgresql-dev && docker-php-ext-install pdo_pgsql

RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN rm -rf composer-setup.php
