FROM dockerfile/nodejs

USER root
ADD . /tactics
WORKDIR /tactics

#RUN gulp
RUN npm install

ENTRYPOINT ["npm", "start"]
