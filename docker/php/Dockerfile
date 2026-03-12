FROM composer:2.7 AS composer

FROM php:8.2-fpm

WORKDIR /var/www

COPY --from=composer /usr/bin/composer /usr/local/bin/composer

ARG DEBIAN_SNAPSHOT=20260312T000000Z

RUN printf "deb http://snapshot.debian.org/archive/debian/%s trixie main\n" "$DEBIAN_SNAPSHOT" > /etc/apt/sources.list \
 && printf "deb http://snapshot.debian.org/archive/debian/%s trixie-updates main\n" "$DEBIAN_SNAPSHOT" >> /etc/apt/sources.list \
 && printf "deb http://snapshot.debian.org/archive/debian-security/%s trixie-security main\n" "$DEBIAN_SNAPSHOT" >> /etc/apt/sources.list \
 && echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until \
 && rm -rf /var/lib/apt/lists/* \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
 && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
