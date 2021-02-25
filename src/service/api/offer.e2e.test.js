'use strict';

const express = require(`express`);
const request = require(`supertest`);
const offer = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);
const mockData = [
  {
    "id": `tnF6UI`,
    "category": [
      `Книги`
    ],
    "description": `Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. Продаю несколько. От трех штук — скидка 5%. Продаю с болью в сердце...`,
    "picture": `item01.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `SALE`,
    "sum": 89211,
    "comments": [
      {
        "id": `Vs3Tg5`,
        "text": `Совсем немного... Неплохо, но дорого.`
      },
      {
        "id": `Vqc5K5`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `1u1jWE`,
        "text": `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
      },
      {
        "id": `t_7q3A`,
        "text": `А где блок питания? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "id": `5EXpRK`,
    "category": [
      `Животные`
    ],
    "description": `Таких предложений больше нет! Товар в отличном состоянии. Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item15.jpg`,
    "title": `Куплю породистого кота`,
    "type": `SALE`,
    "sum": 30436,
    "comments": [
      {
        "id": `rjcdna`,
        "text": `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      },
      {
        "id": `uSfpYa`,
        "text": `Вы что?! В магазине дешевле. А где блок питания? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `UxA3r4`,
        "text": `А сколько игр в комплекте? Совсем немного... А где блок питания?`
      },
      {
        "id": `_G1ENa`,
        "text": `Неплохо, но дорого.`
      }
    ]
  },
  {
    "id": `IjwpPp`,
    "category": [
      `Журналы`
    ],
    "description": `Очень выгодная ценя для такого состояния. Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки. Продаю несколько. От трех штук — скидка 5%.`,
    "picture": `item010.jpg`,
    "title": `Куплю стол`,
    "type": `SALE`,
    "sum": 93093,
    "comments": [
      {
        "id": `65l2WS`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Совсем немного... С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `3l6_II`,
        "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте? Неплохо, но дорого.`
      },
      {
        "id": `VC6G1u`,
        "text": `Неплохо, но дорого. С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `tE-sYB`,
        "text": `А где блок питания? Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `I15JJ5`,
    "category": [
      `Посуда`
    ],
    "description": `Это настоящая находка для коллекционера! Даю недельную гарантию. Продаю несколько. От трех штук — скидка 5%. Бонусом отдам все аксессуары.`,
    "picture": `item05.jpg`,
    "title": `Куплю стол`,
    "type": `OFFER`,
    "sum": 93647,
    "comments": [
      {
        "id": `l_79Aq`,
        "text": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. Почему в таком ужасном состоянии?`
      },
      {
        "id": `soq7UT`,
        "text": `Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `I5Nxi4`,
    "category": [
      `Книги`
    ],
    "description": `При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Бонусом отдам все аксессуары. Это настоящая находка для коллекционера!`,
    "picture": `item15.jpg`,
    "title": `Куплю антиквариат`,
    "type": `OFFER`,
    "sum": 60622,
    "comments": [
      {
        "id": `wKN7IO`,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "id": `btd06X`,
        "text": `А где блок питания? Оплата наличными или перевод на карту?`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new OfferService(cloneData), new CommentService());
  return app;
};

// offer

describe(`API returns a list of all offers`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 5 offers`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "tnF6UI"`, () => expect(response.body[0].id).toBe(`tnF6UI`));

});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/tnF6UI`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Продам книги Стивена Кинга"`, () => expect(response.body.title).toBe(`Продам книги Стивена Кинга`));

});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).post(`/offers`).send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app).post(`/offers`).send(badOffer).expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).put(`/offers/tnF6UI`).send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app).get(`/offers/tnF6UI`).expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app).put(`/offers/NOEXST`).send(validOffer).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app).put(`/offers/NOEXST`).send(invalidOffer).expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/tnF6UI`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`tnF6UI`));

  test(`Offer count is 4 now`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app).delete(`/offers/NOEXST`).expect(HttpCode.NOT_FOUND);

});

// comments

describe(`API returns a list of comments to given offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/5EXpRK/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));

  test(`First comment's id is "rjcdna"`, () => expect(response.body[0].id).toBe(`rjcdna`));

});

describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).post(`/offers/5EXpRK/comments`).send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app).get(`/offers/5EXpRK/comments`).expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/5EXpRK/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/5EXpRK/comments/rjcdna`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`rjcdna`));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/offers/5EXpRK/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app).delete(`/offers/5EXpRK/comments/NOEXST`).expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent offer`, () => {

  const app = createAPI();

  return request(app).delete(`/offers/NOEXST/comments/rjcdna`).expect(HttpCode.NOT_FOUND);

});
