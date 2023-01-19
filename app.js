function removePassword(reset) {
  if (reset) {
    this.password = undefined;
  } else {
    this.password = '1';
  }
}

const user = {
  name: 'Ivan',
  password: '55657',
};

const removePasswordUser = removePassword.bind(user);
removePasswordUser(true);
console.log(user);
