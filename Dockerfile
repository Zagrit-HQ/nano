FROM node:24-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY src src
COPY index.js .

RUN adduser -D -u 1001 -G root nonroot
USER 1001

EXPOSE 8080
CMD ["node", "index.js"]
