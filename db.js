const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/reklamka');
    console.log('MongoDB подключен');
  } catch (error) {
    console.error(`Ошибка подключения к MongoDB: ${error.message}`);
    console.error(error); // Вывод полного текста ошибки для отладки
    process.exit(1);
  }
};

module.exports = connectDB;
