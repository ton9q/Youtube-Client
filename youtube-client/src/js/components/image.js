function image(data) {
  const img = document.createElement('img');
  img.setAttribute('src', data.src);
  if (typeof data.alt !== 'undefined') {
    img.setAttribute('alt', data.alt);
  }
  return img;
}

export default image;
