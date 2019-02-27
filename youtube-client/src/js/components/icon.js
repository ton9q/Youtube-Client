function icon(iconClasses) {
  const i = document.createElement('i');
  i.classList.add(...iconClasses);
  return i;
}

export default icon;
