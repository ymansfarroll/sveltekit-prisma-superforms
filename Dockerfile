FROM node:18.15.0-alpine3.17
WORKDIR /app
COPY package.json package-lock.json ./
# Add --omit dev to prod env.
RUN npm ci
COPY . .
RUN npm run build && npm prune --production
ENV PORT 5050
EXPOSE 5050
CMD ["node", "build"]

