'use strict';

const express = require(`express`);
const request = require(`supertest`);
const category = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);
const mockData = [
  {
    "id": `fusPBT`,
    "category": [
      `Инструменты`
    ],
    "description": `Sen aaa aaaa aaa aaaa. При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Это настоящая находка для коллекционера!`,
    "picture": `item0NaN.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `OFFER`,
    "sum": 19120,
    "comments": [
      {
        "id": `CPoTcM`,
        "text": `Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?`
      },
      {
        "id": `T_MPLE`,
        "text": `Совсем немного...`
      },
      {
        "id": `ZGJR10`,
        "text": `Неплохо, но дорого. Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      },
      {
        "id": `uKyutV`,
        "text": `Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`
      }
    ]
  },
  {
    "id": `KfAgZw`,
    "category": [
      `Животные`
    ],
    "description": `Это настоящая находка для коллекционера! Даю недельную гарантию. Sen aaa aaaa aaa aaaa. Sen bbb bbbb bbb bbbb.`,
    "picture": `item0NaN.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `SALE`,
    "sum": 46731,
    "comments": [
      {
        "id": `7hqMGX`,
        "text": `Почему в таком ужасном состоянии? А где блок питания? Вы что?! В магазине дешевле.`
      },
      {
        "id": `MT7EJP`,
        "text": `А где блок питания? С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `BODn-C`,
    "category": [
      `Игры`
    ],
    "description": `Sen aaa aaaa aaa aaaa. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера!`,
    "picture": `item0NaN.jpg`,
    "title": `Title ccc ccccc`,
    "type": `SALE`,
    "sum": 33803,
    "comments": [
      {
        "id": `e8nMVx`,
        "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте?`
      },
      {
        "id": `7fqGWW`,
        "text": ``
      }
    ]
  },
  {
    "id": `EwMwVT`,
    "category": [
      `Игры`
    ],
    "description": `Если найдёте дешевле — сброшу цену. Даю недельную гарантию. Sen aaa aaaa aaa aaaa. Продаю с болью в сердце...`,
    "picture": `item0NaN.jpg`,
    "title": `Куплю породистого кота`,
    "type": `OFFER`,
    "sum": 72161,
    "comments": [
      {
        "id": `yJ8zQ-`,
        "text": `Совсем немного...`
      },
      {
        "id": `H4N3_A`,
        "text": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. `
      },
      {
        "id": `Jxafds`,
        "text": `А сколько игр в комплекте? Совсем немного... Вы что?! В магазине дешевле.`
      },
      {
        "id": `oRSSMh`,
        "text": `Почему в таком ужасном состоянии? А где блок питания? Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `Tn0UX3`,
    "category": [
      `Журналы`
    ],
    "description": `Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера!`,
    "picture": `item0NaN.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `SALE`,
    "sum": 70869,
    "comments": [
      {
        "id": `yZ2Zcu`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Совсем немного...`
      },
      {
        "id": `gosYjz`,
        "text": `А сколько игр в комплекте?`
      },
      {
        "id": `nwyszy`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `odAG_A`,
        "text": `Неплохо, но дорого.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API return category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "Инструменты", "Животные", "Игры", "Журналы"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Инструменты`, `Животные`, `Игры`, `Журналы`])
      )
  );

});
