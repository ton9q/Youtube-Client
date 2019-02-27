function wrapper(data, className, id) {
  const div = document.createElement('div');
  if (typeof className !== 'undefined') {
    div.classList.add(className);
  }
  if (typeof id !== 'undefined') {
    div.setAttribute('id', id);
  }
  if (data instanceof Array) { // data - array of dom-elements
    div.append(...data);
  } else if (data !== null) {
    div.appendChild(data);
  }
  return div;
}

export default wrapper;
