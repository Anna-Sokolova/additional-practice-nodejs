const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
//или
// require("dotenv").config()
const router = require("./routers/router"); //импорт файла маршрутизации

const PORT = process.env.PORT || 5001;

const app = express(); //создали сервер через экспресс

//middleware
app.use(express.json()); //с помощью мидлвар use говорим нашему серверу распозновать JSON формат
app.use(router); //с помощью мидлвар use говорим нашему серверу использовать маршрутизацию при запросах на сервер

app.listen(PORT, () => {
  console.log(`Server app is running at port ${PORT}`);
});
