FROM node:15.2.1-alpine3.10

WORKDIR /app
ADD package.json /app/package.json
ADD tsconfig.build.json /app/tsconfig.build.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install
ADD . /app
EXPOSE 3000
CMD ["npm", "run", "start"]