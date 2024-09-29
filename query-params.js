(function () {
  const url = new URL(window.location.href);
  const queryParams = url.search;
  if (queryParams) {
    store(queryParams);
  } else {
    restore();
  }

  function store(queryParams) {
    storeToLocalStorage(queryParams);
    storeToCookie(queryParams);
  }

  function storeToLocalStorage(queryParams) {
    localStorage.setItem(key(), queryParams);
  }

  function storeToCookie(queryParams) {
    document.cookie = [
      [key(), queryParams].join("="),
      ["max-age", 7 * 24 * 60 * 60].join("="),
    ].join(";");
  }

  function restore() {
    const savedQueryParams = restoreFromLocalStorage() || restoreFromCookie();
    if (savedQueryParams) {
      storeToLocalStorage(savedQueryParams);
      reflect(savedQueryParams);
    } else {
      alert(`No action.`);
    }
  }

  function restoreFromLocalStorage() {
    return localStorage.getItem(key());
  }

  function restoreFromCookie() {
    const cookies = document.cookie.split(";").map((it) => it.trim());
    const cookie = cookies.find((c) => c.split("=", 2)[0] === key());
    return cookie ? cookie.split("=", 2)[1] : null;
  }

  function reflect(savedQueryParams) {
    const newUrl =
      window.location.origin + window.location.pathname + savedQueryParams;
    window.history.replaceState(null, "", newUrl);
  }

  function key() {
    return "app:kakeibo-entry:savedQueryParams";
  }
})();
