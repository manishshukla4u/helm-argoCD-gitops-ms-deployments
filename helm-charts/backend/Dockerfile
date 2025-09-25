FROM node:18
WORKDIR /app
COPY files/package.json .
RUN npm install
COPY files/server.js .
ENV PORT=4000
EXPOSE 4000
CMD ["node", "server.js"]
