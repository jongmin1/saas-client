FROM node:20.17 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --save
COPY . .
RUN npm run build

# EXPOSE 3000
# CMD ["npm", "run", "preview"]
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
