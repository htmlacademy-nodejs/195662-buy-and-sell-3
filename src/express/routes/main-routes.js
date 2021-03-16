'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  // Из-за бага в pug вместо offer в express части приложения будет использоваться suggestion
  const suggestions = await api.getOffers();
  res.render(`main`, {suggestions});
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`search-result`, {results});
  } catch (error) {
    res.render(`search-result`, {results: []});
  }
});

module.exports = mainRouter;
