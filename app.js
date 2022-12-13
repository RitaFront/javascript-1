const rate = 80;
const hourseDay = 5;
const daysWeek = 5;

const order = 40;
const holiday = 11;

let priceWork = rate * order;
console.log('Стоимость работы: ' + priceWork + '$');
let doWork = (holiday - 2) * hourseDay >= order;
console.log('Успею выполнить работу? ' + doWork);
