(function () {
  const amountInput = document.querySelector('[name="entry.1644931895"]');

  for (const i of range(10)) {
    document
      .querySelector(`#numeric-key-${i}`)
      .addEventListener("click", () => push(i));
  }

  document.querySelector("#numeric-key-00").addEventListener("click", () => {
    push(0);
    push(0);
  });

  document
    .querySelector("#numeric-key-c")
    .addEventListener("click", () => clear());

  function push(n /* :number */) {
    amountInput.value = Number(amountInput.value) * 10 + n;
  }

  function clear() {
    amountInput.value = 0;
  }
})();
