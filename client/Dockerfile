FROM node:15.2.1-alpine3.10 as builder
WORKDIR /app
ADD package.json /app/package.json
RUN npm install --only=prod
ADD . /app
RUN npm run build
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]