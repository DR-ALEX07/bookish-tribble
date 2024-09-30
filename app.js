const express = require('express');
const path = require('path');
const connectDB = require('./db'); // Подключение к MongoDB
const Ad = require('./models/Ad'); // Модель для рекламных блоков

const app = express();

// Подключение к базе данных
connectDB();

// Установка шаблонизатора EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Подключение статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Главная страница с динамическим рендерингом рекламных блоков
app.get('/', async (req, res) => {
  try {
    // Загрузка всех рекламных блоков из базы данных
    const ads = await Ad.find();
    // Отображение главной страницы с рекламными блоками
    res.render('index', { ads });
  } catch (err) {
    console.error('Ошибка загрузки рекламы:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Маршрут для получения статического HTML файла
app.get('/static', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Пример маршрута для другой страницы (например, "О нас")
app.get('/about', (req, res) => {
  res.render('about'); // Убедитесь, что у вас есть файл views/about.ejs
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
