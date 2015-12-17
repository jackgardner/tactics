FROM quay.io/chronojam/nodejs

USER root
ADD . /tactics
WORKDIR /tactics

RUN npm install

WORKDIR /tactics/build

ENTRYPOINT ["node", "server.js"]
