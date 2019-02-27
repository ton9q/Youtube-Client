function header(data, hClass) {
  if (typeof data.number === 'undefined') { // h1,2,3,4,5,6 ?
    data.number = '1';
  }
  const h = document.createElement(`h${data.number}`);
  if (typeof hClass !== 'undefined') {
    h.classList.add(hClass);
  }
  if (typeof data.title !== 'string') { // data.title = dom-element
    h.appendChild(data.title);
  } else {
    h.textContent = data.title;
  }
  return h;
}

export default header;
