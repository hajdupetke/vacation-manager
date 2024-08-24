FROM node:20-alpine

RUN mkdir application
COPY ../prisma  ./application
COPY ../package.json ../package-lock.json ./application/
WORKDIR /application

RUN npm ci
RUN npx prisma generate

CMD ["npm", "run", "dev"] 