const e = document.querySelectorAll('.one > span');
e.forEach((el) => console.log(el.innerText));
console.log(document.querySelector('#two').innerText);
console.log(document.querySelector('div > span[user-id]').innerText);
