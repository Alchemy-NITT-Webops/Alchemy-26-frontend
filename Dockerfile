# Stage 1: Build the React app
FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Add these two lines right before the build command!
ARG VITE_STRAPI_API_TOKEN
ENV VITE_STRAPI_API_TOKEN=$VITE_STRAPI_API_TOKEN

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built Vite files (Vite puts them in /dist)
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy our custom Nginx routing rules
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]