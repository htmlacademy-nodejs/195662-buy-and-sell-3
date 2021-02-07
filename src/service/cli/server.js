'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const DEFAULT_PORT = 3000;
const {HttpCode} = require(`../../constants`);

const app = express();

app.use(express.json());

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};

// todo В задании сказано: "Если файла нет, или он пуст — возвращается пустой массив.", я не знаю насколько это важно,
//  но какое-то приличное и лаконичное решение не придумал
