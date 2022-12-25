const operations = [1000, -700, 300, -500, 10000];
const startBalance = 100;

function finalBalance(startBalance, operations) {
  let balance = startBalance;
  for (let element of operations) {
    balance += element;
  }
  console.log(`Итоговый баланс: ${balance}`);
}

function negativeBalance(startBalance, operations) {
  let balance = startBalance;
  let isOk = true;
  for (let i = 0; i < operations.length; i++) {
    balance += operations[i];
    if (balance < 0) {
      isOk = false;
      break;
    }
  }
  return isOk;
}

function average(operations) {
  let income = 0;
  let expense = 0;
  let i = 0;
  let j = 0;
  for (let element of operations) {
    if (element > 0) {
      income += element;
      i++;
    }
    if (element < 0) {
      expense += element;
      j++;
    }
  }
  console.log(`Средний доход: ${income / i}`);
  console.log(`Средний расход: ${Math.abs(expense) / j}`);
}

finalBalance(startBalance, operations);
console.log(negativeBalance(startBalance, operations));
average(operations);
