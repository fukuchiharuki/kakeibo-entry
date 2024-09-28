function range(n /* :number */) {
  return [...Array(n).keys()].map((it) => Number(it));
}
