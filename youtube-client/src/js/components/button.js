function button(buttonData) {
  const buttonSearch = document.createElement('button');
  buttonSearch.setAttribute('id', buttonData.id);
  buttonSearch.classList.add(buttonData.className);
  buttonSearch.innerHTML = buttonData.inner;
  buttonSearch.addEventListener('click', buttonData.onClick);
  return buttonSearch;
}

export default button;
