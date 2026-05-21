# Cartridge Accounting System

Система учёта картриджей и принтеров для IT-отдела компании.

Проект представляет собой web-приложение для управления складом картриджей, контроля остатков, отслеживания движения и истории операций.

---

# Возможности

- Учёт картриджей
- CRUD операции для картриджей
- Учёт принтеров
- Система движения картриджей
- История операций
- Автоматическое изменение количества при движении
- Dashboard со статистикой
- Статусы остатков
- Контроль минимального количества
- Система последних операций
- Современный dashboard UI

---

# Технологии

## Frontend

- React
- React Router
- Axios
- React Icons
- CSS3

## Backend

- Node.js
- Express.js
- MySQL
- mysql2
- REST API

---

# Интерфейс

## Dashboard

- Статистика картриджей
- Последние операции
- Проблемные позиции
- Контроль остатков

## Картриджи

- Добавление
- Редактирование
- Удаление
- Progress bar остатков
- Статусы наличия

## Принтеры

- CRUD операции
- Привязка моделей

## Движение

- Поступление
- Выдача
- Заправка
- Списание
- Автоматическое обновление остатков

---

# Структура проекта

```bash
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.jsx

server/
├── controllers/
├── routes/
├── config/
├── db/
└── server.js

# Установка проекта

## 1. Клонирование репозитория

```bash
git clone https://github.com/YOUR_USERNAME/cartridge-accounting.git
```

---

## 2. Переход в папку проекта

```bash
cd cartridge-accounting
```

---

## 3. Установка frontend

```bash
cd client
npm install
npm run dev
```

Frontend будет доступен по адресу:

```txt
http://localhost:5173
```

---

## 4. Установка backend

Откройте второй терминал:

```bash
cd server
npm install
npm run dev
```

Backend будет запущен по адресу:

```txt
http://localhost:5000
```

---

# Настройка MySQL

## 1. Создайте базу данных

```sql
CREATE DATABASE cartridge_accounting;
```

---

## 2. Выберите базу данных

```sql
USE cartridge_accounting;
```

---

## 3. Создайте таблицу картриджей

```sql
CREATE TABLE cartridges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    printer VARCHAR(255),
    qty INT DEFAULT 0,
    min_qty INT DEFAULT 1,
    refill_date DATE,
    note TEXT
);
```

---

## 4. Создайте таблицу принтеров

```sql
CREATE TABLE printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    cartridge_model VARCHAR(255),
    note TEXT
);
```

---

## 5. Создайте таблицу движения

```sql
CREATE TABLE movements (
    id INT AUTO_INCREMENT PRIMARY KEY,

    cartridge_id INT NOT NULL,

    cartridge_model VARCHAR(255),

    action_type VARCHAR(100) NOT NULL,

    from_location VARCHAR(255),

    to_location VARCHAR(255),

    quantity INT DEFAULT 1,

    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    comment TEXT,

    FOREIGN KEY (cartridge_id)
    REFERENCES cartridges(id)
    ON DELETE CASCADE
);
```

---

# Настройка переменных окружения

## Создайте файл:

```txt
server/.env
```

---

## Добавьте в него:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cartridge_accounting
PORT=5000
```

---

# Запуск проекта

## Frontend

```bash
cd client
npm run dev
```

---

## Backend

```bash
cd server
npm run dev
```