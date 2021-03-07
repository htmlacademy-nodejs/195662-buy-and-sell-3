'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const api = require(`../api`).getAPI();

myRouter.get(`/`, async (req, res) => {
  // Из-за бага в pug вместо offer в express части приложения будет использоваться suggestion
  const suggestions = await api.getOffers();
  res.render(`my-tickets`, {suggestions});
});
myRouter.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = myRouter;
