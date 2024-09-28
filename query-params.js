(function () {
  const url = new URL(window.location.href);
  const queryParams = url.search;
  if (queryParams) {
    store(queryParams);
  } else {
    restore();
  }

  function store(queryParams) {
    localStorage.setItem("app:kakeibo-entry:savedQueryParams", queryParams);
  }

  function restore() {
    const savedQueryParams = localStorage.getItem("app:kakeibo-entry:savedQueryParams");
    if (savedQueryParams) {
      const newUrl =
        window.location.origin + window.location.pathname + savedQueryParams;
      window.history.replaceState(null, "", newUrl);
    }
  }
})();
