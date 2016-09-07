FROM node:6.2
ENV NODE_ENV production
ENV PORT 80
WORKDIR /code
ADD package.json package.json
RUN npm i --only=dev --silent
RUN npm i --only=prod --silent
ADD . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 80
