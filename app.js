require('dotenv').config();

const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');

// подключаем БД базы для хранения кукисов (session storage) Используем файловую базу данных
const FileStore = require('session-file-store')(session);

// Импортируем созданный в отдельный файлах рутеры.
const entriesRouter = require('./routes/entries');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');

const app = express();
const PORT = process.env.PORT ?? 3100;

// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(__dirname, 'views'));

// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());
hbs.registerPartials(`${__dirname}/views/partials`);

const sessionConfig = {
  name: 'cookieBroccoli',
  store: new FileStore(),
  secret: 'cookieSecretDataBaseBrocol',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 14 },

};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.username = req.session?.user?.login;
  next();
});

app.use('/', mainRouter);
app.use('/entries', entriesRouter);
app.use('/auth', authRouter);

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res, next) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
