const arr = [2, 4, 4, 10, 20];

//мое решение
// function some(arr, el) {
//   let isOk = false;
//   for (const elArr of arr) {
//     if (el === elArr) {
//       isOk = !isOk;
//       break;
//     }
//   }
//   return isOk;
// }

// console.log(some(arr, 1));

//более правильное и короткое решение

// function some(array, element) {
//   let res = array.find((el) => el === element);
//   return res == undefined ? false : true;
// }

// console.log(some(arr, 0));

//решение с помощью метода some

console.log(arr.some((el) => el === 10));
