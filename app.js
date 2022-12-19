// const priceMacbook = 2000;
// const ageUser = 25;
// const jobUser = true;
// let moneyUser = 1500;

function credit(age, job) {
  if (age > 24 && job) {
    return 500;
  } else if (age > 24) {
    return 100;
  } else {
    return 0;
  }
}

// function buyMacbook(age, job, moneyUser, priceMacbook) {
//   if (moneyUser >= priceMacbook) {
//     console.log('Пользователь может купить Macbook :)');
//   } else {
//     const allmoney = credit(age, job) + moneyUser;
//     if (allmoney >= priceMacbook) {
//       console.log('Пользователь может купить Macbook :)');
//     } else {
//       console.log('Пользователь не сможет купить Macbook :(');
//     }
//   }
// }

// buyMacbook(25, false, 1900, 2000);

//более простое решение

function buyMacbook(age, job, moneyUser, priceMacbook) {
  const creditMoney = credit(age, job);
  return priceMacbook <= moneyUser + creditMoney;
}

console.log(buyMacbook(25, false, 1900, 2000));
