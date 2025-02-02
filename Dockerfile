FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Определяем команду запуска
CMD ["node", ".output/server/index.mjs"]

# Опционально указываем порт
EXPOSE 3000