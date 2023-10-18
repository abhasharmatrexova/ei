FROM public.ecr.aws/docker/library/node:20.6.1 as node

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build


FROM public.ecr.aws/docker/library/nginx:1.25.2-alpine
EXPOSE 4200

COPY docker_resources/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

#docker build -t ei-canvas .
#docker run --name ei-canvas -dit --restart unless-stopped -p 8000:80 ei-canvas:latest
