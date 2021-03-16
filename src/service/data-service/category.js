'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = new Set(this._offers.map((item) => item.category).flat());
    return [...categories];
  }
}

module.exports = CategoryService;
