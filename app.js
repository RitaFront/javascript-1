const arr = ['!', 'JS', 'люблю', 'Я'];
const arr2 = [];

for (let i = arr.length - 1; i >= 0; i--) {
  arr2.push(arr[i]);
}

console.log(arr2.join(' '));
