function input(inputData) {
  const inputSearch = document.createElement('input');
  inputSearch.setAttribute('placeholder', inputData.placeholder);
  inputSearch.setAttribute('id', inputData.id);
  inputSearch.classList.add(inputData.className);
  inputSearch.addEventListener('keydown', inputData.onkeydown);
  return inputSearch;
}

export default input;
