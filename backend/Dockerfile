FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY package*.json ./
RUN npm install

# Copiar o restante
COPY . .

# Expor porta
EXPOSE 3050

# Comando de inicialização
CMD ["npm", "start"]
