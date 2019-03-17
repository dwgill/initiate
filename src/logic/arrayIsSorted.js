function arrayIsSortedAsc(array = []) {
  return array.every((val, index) => {
    if (index + 1 >= array.length) {
      return true;
    }

    return val <= array[index + 1];
  });
}

function arrayIsSortedDesc(array = []) {
  return array.every((val, index) => {
    if (index + 1 >= array.length) {
      return true;
    }

    return val >= array[index + 1];
  });
}

function arrayIsSorted(array = [], keyFunc = x => x, ascending = true) {
  if (array.length < 2) {
    return true;
  }
  const mappedArray = array.map(keyFunc);

  return ascending
    ? arrayIsSortedAsc(mappedArray)
    : arrayIsSortedDesc(mappedArray);
}

export default arrayIsSorted;
