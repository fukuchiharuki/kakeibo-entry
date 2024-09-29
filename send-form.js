(function () {
  const dateInput = document.querySelector('[name="entry.502180998"]');
  const amountInput = document.querySelector('[name="entry.1644931895"]');
  const accountItemInput = document.querySelector('[name="entry.1872975358"]');
  const noteInput = document.querySelector('[name="entry.1263347079"]');
  const whoSpentInput = document.querySelector('[name="entry.1354928899"]');

  document.querySelector("#submit").addEventListener("click", () => {
    if (!action()) {
      alert(`Setup failed.`);
      return;
    }
    if (!isValid()) {
      alert(`Please complete all required fields.\n${incompleteFields()}`);
      return;
    }
    if (!confirmForm()) {
      return;
    }
    sendForm();
    takeOver();
    scrollTop();
  });

  function isValid() {
    return incompleteFields().length === 0;
  }

  function incompleteFields() {
    return [
      !!dateInput.value || "使った日",
      !!Number(amountInput.value) || "使った金額",
      !!accountItemInput.value || "勘定項目",
      !!whoSpentInput.value || "使った人",
    ].filter((it) => it !== true);
  }

  function confirmForm() {
    return confirm(
      [
        `【使った日】 ${dateInput.value}`,
        `【使った金額】 ${amountInput.value} 円`,
        `【勘定項目】 ${accountItemInput.value}`,
        `【摘要】 ${noteInput.value}`,
        `【使った人】 ${whoSpentInput.value}`,
      ].join("\n")
    );
  }

  function sendForm() {
    fetch(action(), {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body(),
    });
  }

  function action() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("action");
  }

  function body() {
    const [year, month, day] = dateInput.value.split("/");
    const dateInputParams = [
      ["year", year],
      ["month", month],
      ["day", day],
    ].map(
      (it) =>
        `${dateInput.getAttribute("name")}_${it[0]}=${encodeURIComponent(
          it[1]
        )}`
    );
    const ordinaryParams = [
      amountInput,
      accountItemInput,
      noteInput,
      whoSpentInput,
    ].map((el) => `${el.getAttribute("name")}=${encodeURIComponent(el.value)}`);
    return [...dateInputParams, ...ordinaryParams].join("&");
  }

  function takeOver() {
    amountInput.value = 0;
    accountItemInput.value = "";
    noteInput.value = "";
  }

  function scrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
})();
