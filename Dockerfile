FROM node:18-alpine
ENV NEXT_PUBLIC_BASE_URL="https://myip.10ms.ir"
WORKDIR /app
COPY . /app
RUN npm install && \
	npm run build
CMD ["npm", "start", "--", "-p", "80"]
