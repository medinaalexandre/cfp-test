FROM php:8.2-fpm-alpine

RUN apk update && apk --no-cache add bash

RUN apk add --no-cache postgresql-dev && docker-php-ext-install pdo_pgsql

RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    &&  apk add --no-cache --update linux-headers
RUN pecl install xdebug \
RUN docker-php-ext-enable xdebug \
RUN apk del -f .build-deps

RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN rm -rf composer-setup.php

RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.mode=coverage" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini

EXPOSE 9000
