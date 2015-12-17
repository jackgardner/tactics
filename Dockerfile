FROM quay.io/chronojam/nodejs

USER root
ADD . /tactics
WORKDIR /tactics

RUN npm install
RUN npm run build

WORKDIR /tactics/build

ENTRYPOINT ["node", "server.js"]
