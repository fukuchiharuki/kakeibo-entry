(function () {
  const accountItemInput = document.querySelector('[name="entry.1872975358"]');

  document.querySelectorAll(".account-item").forEach((el) =>
    el.addEventListener("click", (e) => {
      accountItemInput.value = e.currentTarget.textContent.trim();
    })
  );
})();
