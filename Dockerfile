FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY dist/ ./
COPY nginx/default.conf /etc/nginx/conf.d/
