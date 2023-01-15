const company = {
  name: 'ООО Агро',
  employees: [
    {
      name: 'Света',
    },
    {
      name: 'fff',
    },
  ],
  ceo: {
    name: 'Вася',
  },
  nameCompany: function () {
    return this.name;
  },
  nameCeo: function () {
    return this.ceo.name;
  },
  nameEmp: function () {
    let a = this.employees.map((obj) => obj.name);
    return a.join(' ');
  },
};

console.log(company.nameCompany());
console.log(company.nameCeo());
console.log(company.nameEmp());
