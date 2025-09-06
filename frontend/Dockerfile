FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Gerar build do Next.js
RUN npm run build

# Usar imagem leve do Node para rodar
FROM node:18
WORKDIR /app

# Copiar apenas o build e deps
COPY --from=build /app ./

EXPOSE 3001
CMD ["npm", "start"]
