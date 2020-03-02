FROM node
WORKDIR /app
ADD . /app
RUN npm install
ENV PORT 3000
ENV IP "0.0.0.0"
CMD ["node","."]