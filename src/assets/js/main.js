let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY';
let globalActiveHabbitId;

//page

const page = {
  menu: document.querySelector('.menu__list'),
  header: {
    title: document.querySelector('.header__title'),
    progressPersent: document.querySelector('.progress__percent'),
    progressCoverBar: document.querySelector('.progress__cover-bar'),
  },
  body: {
    day: document.querySelector('.habbit__day'),
    comment: document.querySelector('.habbit__comment'),
  },
  main: {
    content: document.querySelector('.main__content'),
  },
  nextDay: {
    title: document.getElementById('next-day'),
  },
};

//utils

function loadData() {
  const habbitsString = localStorage.getItem(HABBIT_KEY);
  const habbitArray = JSON.parse(habbitsString);
  if (Array.isArray(habbitArray)) {
    habbits = habbitArray;
  }
}

function saveData() {
  localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

//render

function rerenderMenu(activeHabbit) {
  for (const habbit of habbits) {
    const existed = document.querySelector(
      `[menu-habbit-id="${habbit.id}"]`
    );
    if (!existed) {
      const element = document.createElement('button');
      element.setAttribute('menu-habbit-id', habbit.id);
      element.classList.add('menu__btn');
      element.addEventListener('click', () => rerender(habbit.id));
      element.innerHTML = `<img src="./assets/images/${habbit.icon}.svg" alt="${habbit.name}" />`;
      if (activeHabbit.id === habbit.id) {
        element.classList.add('menu__btn--active');
      }
      page.menu.appendChild(element);
      continue;
    }
    if (activeHabbit.id === habbit.id) {
      existed.classList.add('menu__btn--active');
    } else {
      existed.classList.remove('menu__btn--active');
    }
  }
}

function rerenderHead(activeHabbit) {
  page.header.title.innerText = activeHabbit.name;
  const progress =
    activeHabbit.days.length / activeHabbit.target > 1
      ? 100
      : (activeHabbit.days.length / activeHabbit.target) * 100;
  page.header.progressPersent.innerText = progress.toFixed(0) + ' %';
  page.header.progressCoverBar.setAttribute(
    'style',
    `width: ${progress}%`
  );
}

function rerenderBody(activeHabbit) {
  page.main.content.innerHTML = '';
  page.nextDay.title.innerHTML = `День ${
    activeHabbit.days.length + 1
  }`;

  let dayNumber = 0;

  for (let day of activeHabbit.days) {
    ++dayNumber;
    renderBodyElement(day, dayNumber);
  }

  function renderBodyElement(dayData, dayNumber) {
    const habbitElement = document.createElement('div');
    habbitElement.classList.add('habbit');

    const habbitElementContent = `
    <div class="habbit__day">День ${dayNumber}</div>
              <div class="habbit__comment">
                ${dayData.comment}
              </div>
              <button class="delete" onclick="deleteDay(${dayNumber})">
                <img src="./assets/images/delete.svg" alt="Удалить" />
              </button>
    `;

    habbitElement.innerHTML = habbitElementContent;
    page.main.content.appendChild(habbitElement);
  }
}

function rerender(activeHabbitId) {
  globalActiveHabbitId = activeHabbitId;
  const activeHabbit = habbits.find(
    (habbit) => habbit.id === activeHabbitId
  );
  if (!activeHabbit) {
    return;
  }
  rerenderMenu(activeHabbit);
  rerenderHead(activeHabbit);
  rerenderBody(activeHabbit);
}

//work with days

function addDays(event) {
  const form = event.target;
  event.preventDefault();
  const data = new FormData(form);
  const comment = data.get('comment');
  form['comment'].classList.remove('error');
  if (!comment) {
    form['comment'].classList.add('error');
  }
  habbits = habbits.map((habbit) => {
    if (habbit.id === globalActiveHabbitId) {
      return {
        ...habbit,
        days: habbit.days.concat({ comment }),
      };
    }
    return habbit;
  });
  form['comment'].value = '';
  rerender(globalActiveHabbitId);
  saveData();
}

//delete

function deleteDay(dayNumber) {
  habbits = habbits.map((habbit) => {
    if (habbit.id === globalActiveHabbitId) {
      habbit.days.splice(dayNumber - 1, 1);
      return {
        ...habbit,
        days: habbit.days,
      };
    }
    return habbit;
  });
  rerender(globalActiveHabbitId);
  saveData();
}

//init

(() => {
  loadData();
  rerender(habbits[0].id);
})();
