const date = new Date();

// All Buttons queries
const resetDate = document.querySelector("#resetDate");
const searchDate = document.querySelector("#searchDate");
const btnToday = document.querySelector("#btnToday");
const btnMonth = document.querySelector("#btnmonth");
const btnListView = document.querySelector("#btnListView");

// Main function
const redoCalendar = () => {
  const main = document.querySelector(".main");

  // Initial constant of date
  const currMonth = date.getMonth();
  const currYear = date.getFullYear();

  // The last day in this month
  const lastDay = new Date(currYear, currMonth + 1, 0).getDate();

  // The last day of previos month
  const prevLastDay = new Date(currYear, currMonth, 0).getDate();

  // The first day of current month as a number of week's day
  const firstDayIndex = new Date(currYear, currMonth, date.getDay()).getDate();

  // The last day of current month as a number of week's day
  const lastDayIndex = new Date(currYear, currMonth + 1, 0).getDay();

  // Counted days from next month, that will use in the current month
  const nextDays = 7 - lastDayIndex - 1;

  // Total weeks in month
  const totalWeeks = Math.ceil((lastDay + firstDayIndex) / 7);

  const daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortDaysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  // Temporary storage
  let days = "";

  // let events = [];
  // moreArrays = [];
  // lineArrays = [];

  // const localEvents = () => {
  //   localStorage.getItem("events")
  //     ? ((events = JSON.parse(localStorage.getItem("events"))), drawEvents())
  //     : (events = []);
  // };

  const drawTitle = () => {
    main.innerHTML = `<div class="main__arrows">
  <div id="prev" class="arrow arrow-rotate"></div>
  <div class="main__title" id="titlemonth">${monthArray[currMonth]}, ${currYear}</div>
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
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
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
    date.setMonth(currMonth - 1);
    redoCalendar();
  });

  document.querySelector("#next").addEventListener("click", () => {
    date.setMonth(currMonth + 1);
    redoCalendar();
  });
};

btnToday.addEventListener("click", () => {
  date.setMonth(new Date().getMonth());
  redoCalendar();
});

redoCalendar();
