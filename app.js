const investUsd = 12000;
const percent = 0.07;
const term = 2 * 12;
const priceHouseUsd = 13500;

let result = investUsd * (1 + percent / 12) ** term;

if (result >= priceHouseUsd) {
  console.log('Сможет купить дом');
  let remainder = result - priceHouseUsd;
  console.log(remainder);
} else {
  console.log('Не сможет купить дом');
}
