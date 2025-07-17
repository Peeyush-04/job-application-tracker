FROM node:20-alpine AS builder

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy source & build (if needed)
COPY . .

# expose port
EXPOSE 5000

# start in production mode
CMD ["node", "index.js"]
