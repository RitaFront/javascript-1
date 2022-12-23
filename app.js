const tasks = ['Задача 1'];

function addTask(task, array) {
  array.push(task);
}

addTask('Задача 2', tasks);
addTask('Задача 3', tasks);

console.log(tasks);

function deleteTask(task, array) {
  const indexTask = array.indexOf(task);
  if (indexTask === -1) {
    return;
  }
  array.splice(indexTask, 1);
}

deleteTask('Задача 4', tasks);

console.log(tasks);

function transformTasks(task, array) {
  const indexTask = array.indexOf(task);
  if (indexTask === -1) {
    return;
  }
  const findTask = array.splice(indexTask, 1).join();
  array.unshift(findTask);
}

transformTasks('Задача 3', tasks);
console.log(tasks);
