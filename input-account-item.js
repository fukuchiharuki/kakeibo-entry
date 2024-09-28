(function () {
  const whoSpentInput = document.querySelector('[name="entry.1354928899"]');

  document.querySelectorAll(".who-spent").forEach((el) =>
    el.addEventListener("click", (e) => {
      whoSpentInput.value = e.currentTarget.textContent.trim();
    })
  );
})();
