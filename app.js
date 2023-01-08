const userName = 'Вася aka Terminator Perdinator Пупкин';

let name = userName.slice(0, userName.indexOf(' '));
let surname = userName.slice(
  userName.lastIndexOf(' ') + 1,
  userName.length
);

console.log(name + ' ' + surname);
