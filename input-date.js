(function () {
  let weekCursor = new Date();
  const weekDayButtons = [
    document.querySelector("#week-day-0"),
    document.querySelector("#week-day-1"),
    document.querySelector("#week-day-2"),
    document.querySelector("#week-day-3"),
    document.querySelector("#week-day-4"),
    document.querySelector("#week-day-5"),
    document.querySelector("#week-day-6"),
  ];

  const dateInput = document.querySelector('[name="entry.502180998"]');
  const dateDayLabel = document.querySelector("#date-day");

  if (dateInput && !dateInput.value) {
    reflectDate(new Date());
    refreshWeek();
  }

  document
    .querySelector("#week-previous")
    .addEventListener("click", () => {
      reflectWeek(minusDays(weekCursor, 7));
    });

  document.querySelector("#wee-this").addEventListener("click", () => {
    reflectWeek(new Date());
  });

  document.querySelector("#week-next").addEventListener("click", () => {
    reflectWeek(plusDays(weekCursor, 7));
  });

  for (const i in [...Array(7).keys()]) {
    weekDayButtons[i].addEventListener("click", () => {
      reflectDate(minusDays(weekCursor, weekCursor.getDay() - i));
    });
  }

  function reflectWeek(newWeekCursor /* :Date */) {
    weekCursor = newWeekCursor;
    refreshWeek();
  }

  function refreshWeek() {
    for (const i in [...Array(7).keys()]) {
      const date = minusDays(weekCursor, weekCursor.getDay() - i);
      weekDayButtons[i].innerHTML =
        `(${["日", "月", "火", "水", "木", "金", "土"][date.getDay()]})` +
        "<br />" +
        toShortDateString(date);
      if (date.toDateString() === new Date().toDateString()) {
        weekDayButtons[i].innerHTML = `<i>${weekDayButtons[i].innerHTML}</i>`;
      }
    }
  }

  function reflectDate(date /* :Date */) {
    dateInput.value = toDateString(date);
    dateDayLabel.innerHTML = `(${
      ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
    })`;
  }

  function toDateString(date /* :Date */) {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function toShortDateString(date /* :Date */) {
    return date.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
    });
  }

  function plusDays(date /* :Date */, days /* :number */) {
    const ret = new Date(date);
    ret.setDate(ret.getDate() + days);
    return ret;
  }

  function minusDays(date /* :Date */, days /* :number */) {
    return plusDays(date, -days);
  }
})();
