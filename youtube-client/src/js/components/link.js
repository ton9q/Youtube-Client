function link(data) {
  const a = document.createElement('a');
  a.setAttribute('href', data.href);
  a.innerHTML = data.text;
  return a;
}

export default link;
