let result = prompt('Сколько будет 7 + или - 15?');

//1 вариант с помощью if
// if (result == 22 || result == -8 || result == 'Я не робот') {
//   console.log('Успех');
// } else {
//   console.log('Вы робот');
// }

//2 вариант с помощью swich
// switch (result) {
//   case '22':
//   case '-8':
//   case 'Я не робот':
//     console.log('Успех');
//     break;
//   default:
//     console.log('Вы робот');
// }

//3 вариант как правильнее
switch (true) {
  case result === 'Я не робот':
  case Number(result) === 22:
  case Number(result) === -8:
    console.log('Успех');
    break;
  default:
    console.log('Вы робот');
}
