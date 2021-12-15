const date = new Date();

// All Buttons
const resetDate = document.querySelector("#resetDate");
const searchDate = document.querySelector("#searchDate");
const btnToday = document.querySelector("#btnToday");
const btnMonth = document.querySelector("#btnmonth");
const btnListView = document.querySelector("#btnListView");

redoCalendar = () => {
  const main = document.querySelector(".main");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate(); // последний день этого месяца

  const firstDayIndex = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDate(); // первый день недели в этом месяце (число (пятница - 5))

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate(); // последний день предыдущего месяца

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay(); // возвращаем индекс дня недели, на котором заканчивается текущий месяц

  const nextDays = 7 - lastDayIndex - 1; // Определить сколько нужно отрисовать из следующего месяца (7 - дней недели, 1 - т.к. отсчет с 0)

  const daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Временное хранение
  let days = "";

  moreArrays = {};
  lineArrays = {
    0: [],
    1: [],
    2: [],
  };

  const drawTitle = () => {
    main.innerHTML = `<div class="main__arrows">
  <div id="prev" class="arrow arrow-rotate"></div>
  <div class="main__title" id="titlemonth">${
    monthArray[date.getMonth()]
  }, ${date.getFullYear()}</div>
  <div id="next" class="arrow"></div>
  </div>`;
  };

  const drawHeader = (table) => {
    table.innerHTML = "";
    table.innerHTML += `<div class="main__table_thead"></div>`;
    const thead = document.querySelector(".main__table_thead");
    for (let i = 0; i < daysArray.length; i++) {
      thead.innerHTML += `<div class="main__table_td">${daysArray[i]}</div>`;
    }
  };

  prevMonthDays = () => {
    for (let i = firstDayIndex; i > 0; i--) {
      days += `<div class="main__table_td"><div class="prev-date cell">${
        prevLastDay - i + 1
      }</div></div>`;
    } // отрисовка дней из прошлого месяца
  };

  currentMonthDays = () => {
    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        days += `<div class="main__table_td"><div class="today cell">${i}</div><div class="line line-arrow"></div></div>`;
      } else {
        days += `<div class="main__table_td"><div class="cell">${i}</div></div>`;
      }
    }
  };

  nextMonthDays = () => {
    for (let i = 1; i <= nextDays; i++) {
      days += `<div class="main__table_td"><div class="next-date cell">${i}</div></div>`;
    }
  };

  const drawMain = (table) => {
    table.innerHTML += `<div class="main__table_tbody"></div>`;
    const tbody = document.querySelector(".main__table_tbody");
    prevMonthDays();
    currentMonthDays();
    nextMonthDays();
    tbody.innerHTML += days; // даты теперь в html
  };

  const drawCalendar = () => {
    drawTitle();
    main.innerHTML += `<div class="table"></div>`;
    const table = document.querySelector(".table");
    drawHeader(table);

    drawMain(table);
  };

  drawCalendar();

  document.querySelector("#prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    redoCalendar();
  });

  document.querySelector("#next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    redoCalendar();
  });
};

btnToday.addEventListener("click", () => {
  date.setMonth(new Date().getMonth());
  redoCalendar();
});

redoCalendar();
