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
  popup: {
    content: document.querySelector('.cover'),
    iconFiled: document.querySelector(
      '.popup__form input[name="icon"]'
    ),
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

function togglePopup() {
  page.popup.content.classList.toggle('cover__hidden');
}

function resetForm(form, fields) {
  for (const field of fields) {
    form[field].value = '';
  }
}

function validateForm(form, fields) {
  const formData = new FormData(form);
  const res = {};
  for (const field of fields) {
    const fieldValue = formData.get(field);
    form[field].classList.remove('error');
    if (!fieldValue) {
      form[field].classList.add('error');
    }
    res[field] = fieldValue;
  }
  let isValid = true;
  for (const field of fields) {
    if (!res[field]) {
      isValid = false;
    }
  }
  if (!isValid) {
    return;
  }
  return res;
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
  document.location.replace(
    document.location.pathname + '#' + activeHabbitId
  );
  rerenderMenu(activeHabbit);
  rerenderHead(activeHabbit);
  rerenderBody(activeHabbit);
}

//work with days

function addDays(event) {
  event.preventDefault();
  const data = validateForm(event.target, ['comment']);
  if (!data) {
    return;
  }
  habbits = habbits.map((habbit) => {
    if (habbit.id === globalActiveHabbitId) {
      return {
        ...habbit,
        days: habbit.days.concat([{ comment: data.comment }]),
      };
    }
    return habbit;
  });
  resetForm(event.target, ['comment']);
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

//working with habbits

function setIcon(context, icon) {
  page.popup.iconFiled.value = icon;
  const activeIcon = document.querySelector('.icon.icon--active');
  activeIcon.classList.remove('icon--active');
  context.classList.add('icon--active');
}

function addHabbit(event) {
  event.preventDefault();
  const data = validateForm(event.target, ['name', 'icon', 'target']);
  if (!data) {
    return;
  }
  const maxId = habbits.reduce(
    (acc, habbit) => (acc > habbit.id ? acc : habbit.id),
    0
  );
  habbits.push({
    id: maxId + 1,
    name: data.name,
    icon: data.icon,
    target: data.target,
    days: [],
  });
  resetForm(event.target, ['name', 'target']);
  togglePopup();
  saveData();
  rerender(maxId + 1);
}

//init

(() => {
  loadData();
  const hashId = Number(document.location.hash.replace('#', ''));
  const urlHabbit = habbits.find((habbit) => habbit.id === hashId);
  if (urlHabbit) {
    rerender(urlHabbit.id);
  } else {
    rerender(habbits[0].id);
  }
})();
