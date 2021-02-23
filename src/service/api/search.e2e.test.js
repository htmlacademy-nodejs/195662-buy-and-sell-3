'use strict';

const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);
const mockData = [
  {
    "id": `KpsnNc`,
    "category": [
      `Гаджеты`
    ],
    "description": `Если найдёте дешевле — сброшу цену. Sen ccc cccc ccc cccc. Таких предложений больше нет! Продаю с болью в сердце...`,
    "picture": `item0NaN.jpg`,
    "title": `Куплю антиквариат`,
    "type": `SALE`,
    "sum": 82347,
    "comments": [
      {
        "id": `_So-rz`,
        "text": `Оплата наличными или перевод на карту? А сколько игр в комплекте?`
      },
      {
        "id": `v0-G9_`,
        "text": `С чем связана продажа? Почему так дешёво? `
      }
    ]
  },
  {
    "id": `XOnhEZ`,
    "category": [
      `Книги`
    ],
    "description": `Товар в отличном состоянии. Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. Если найдёте дешевле — сброшу цену.`,
    "picture": `item0NaN.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `OFFER`,
    "sum": 19364,
    "comments": [
      {
        "id": `EXkU0b`,
        "text": `Неплохо, но дорого.`
      },
      {
        "id": `NFz-m2`,
        "text": `А где блок питания?  С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `S0twyd`,
        "text": `Оплата наличными или перевод на карту? Неплохо, но дорого. А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `i2xjJZ`,
    "category": [
      `Книги`
    ],
    "description": `Бонусом отдам все аксессуары. Продаю с болью в сердце... Пользовались бережно и только по большим праздникам. Sen aaa aaaa aaa aaaa.`,
    "picture": `item0NaN.jpg`,
    "title": `Куплю породистого кота`,
    "type": `SALE`,
    "sum": 76581,
    "comments": [
      {
        "id": `1UOYvB`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `GuGalP`,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "id": `hsROXm`,
        "text": `А где блок питания?  Неплохо, но дорого.`
      }
    ]
  },
  {
    "id": `pCcxF1`,
    "category": [
      `Разное`
    ],
    "description": `Sen bbb bbbb bbb bbbb. Товар в отличном состоянии. Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам.`,
    "picture": `item0NaN.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `SALE`,
    "sum": 29764,
    "comments": [
      {
        "id": `j9GV_U`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `_6mUab`,
        "text": `Почему в таком ужасном состоянии?`
      },
      {
        "id": `fY0Qg3`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `YwT1B9`,
        "text": ` Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `hr7_A7`,
    "category": [
      `Разное`
    ],
    "description": `При покупке с меня бесплатная доставка в черте города. Sen aaa aaaa aaa aaaa. Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию.`,
    "picture": `item0NaN.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `SALE`,
    "sum": 2305,
    "comments": [
      {
        "id": `p7M_v4`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `9AT_Rb`,
        "text": `Совсем немного...`
      },
      {
        "id": `1aKO-p`,
        "text": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `ZGIsns`,
        "text": `Вы что?! В магазине дешевле.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Продам отличную подборку`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`XOnhEZ`));

});

test(`API returns code 404 if nothing is found`,
    () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);
