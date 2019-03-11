# This dockerfile supposes that front-end is already built!
FROM nginx
RUN rm -R /usr/share/nginx/html
COPY build /usr/share/nginx/html