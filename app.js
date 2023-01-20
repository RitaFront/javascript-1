console.log(localStorage.getItem('test'));
function submitForm() {
  const input = document.querySelector('.input').value;
  if (!input) {
    return;
  }
  document.querySelector('.panel').innerText = input;
  document.querySelector('.input').value = '';

  saveLocalStorage(input);
}

function inputChanged(e) {
  if (e.code == 'Enter') {
    submitForm();
  }
}

function saveLocalStorage(value) {
  localStorage.setItem('test', value);
}
