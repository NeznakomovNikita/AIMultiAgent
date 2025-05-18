# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Устанавливаем простой HTTP-сервер для статики
RUN npm install -g serve

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Указываем команду для запуска приложения
CMD ["serve", "-s", "build"]