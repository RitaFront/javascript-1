const users = [
  {
    name: 'Вася',
    surname: 'Пупкин',
    age: 30,
    skills: ['Разработка', 'Готовка'],
  },
  {
    name: 'Катя',
    surname: 'Белова',
    age: 18,
    skills: ['Дизайн'],
  },
];

let userData = users.map((user) => {
  return {
    fullName: `${user.name} ${user.surname}`,
    skillsNum: user.skills.length,
  };
});

console.log(userData);
