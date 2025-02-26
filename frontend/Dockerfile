# Dockerfile.frontend
FROM node:20 as build

WORKDIR C:/DORM/frontend

RUN ls -la  # Проверяем наличие файлов

RUN npm install

RUN ls -la  # Проверяем наличие файлов после копирования

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]