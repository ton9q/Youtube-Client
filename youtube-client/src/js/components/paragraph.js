function paragraph(data, pClass) {
  const p = document.createElement('p');
  if (typeof pClass !== 'undefined') {
    p.classList.add(pClass);
  }
  p.textContent = data;
  return p;
}

export default paragraph;
