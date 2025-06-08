ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /code
EXPOSE 5173
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install
CMD ["npm","run","dev", "--", "--host"]
COPY . /code

