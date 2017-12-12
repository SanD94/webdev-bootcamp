var faker = require('faker');

for (var i = 0; i < 10; ++i) {
  console.log(faker.commerce.productName() + " " +
    faker.finance.amount(10.2, 1000.31, 2, "$"));
}
