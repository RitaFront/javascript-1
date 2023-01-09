const wallet = {
  balance: 0,
  operations: [],
  positiveBalance: function (reason, sum) {
    this.balance += sum;
    this.operations.push({ reason, sum });
    return true;
  },
  negativeBalance: function (reason, sum) {
    if (this.balance < sum) {
      return false;
    }
    this.balance -= sum;
    this.operations.push({ reason, sum });
    return true;
  },
  sumOperations: function () {
    return this.operations.length;
  },
};

console.log(wallet.positiveBalance('Зп', 1000));
console.log(wallet.sumOperations());
console.log(wallet.negativeBalance('Долг', 2000));
console.log(wallet.sumOperations());
console.log(wallet.negativeBalance('Покупка', 500));
console.log(wallet.sumOperations());
console.log(wallet.operations);
console.log(wallet.balance);
