const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const geProductsFromFile = cb => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    
  }

  save() {
    geProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => console.log(err));
    });
  }

  static fetchAll(cb) {
    geProductsFromFile(cb);
  }
};
