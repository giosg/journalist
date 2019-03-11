# This dockerfile supposes that front-end is already built!
FROM nginx
RUN rm -R /usr/share/nginx/html
COPY public /usr/share/nginx/html