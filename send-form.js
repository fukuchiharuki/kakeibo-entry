(function () {
  const dateInput = document.querySelector('[name="entry.502180998"]');
  const amountInput = document.querySelector('[name="entry.1644931895"]');
  const accountItemInput = document.querySelector('[name="entry.1872975358"]');
  const noteInput = document.querySelector('[name="entry.1263347079"]');
  const whoSpentInput = document.querySelector('[name="entry.1354928899"]');

  document.querySelector("#submit").addEventListener("click", () => {
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
      !!accountItemInput.value || "分類",
      !!whoSpentInput.value || "使った人",
    ].filter((it) => it !== true);
  }

  function confirmForm() {
    return confirm(
      [
        `【使った日】 ${dateInput.value}`,
        `【使った金額】 ${amountInput.value} 円`,
        `【分類】 ${accountItemInput.value}`,
        `【メモ】 ${noteInput.value}`,
        `【使った人】 ${whoSpentInput.value}`,
      ].join("\n")
    );
  }

  function sendForm() {
    const body = [
      dateInput,
      amountInput,
      accountItemInput,
      noteInput,
      whoSpentInput,
    ]
      .map((el) => `${el.getAttribute("name")}=${encodeURIComponent(el.value)}`)
      .join("&");

    alert(body);
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
