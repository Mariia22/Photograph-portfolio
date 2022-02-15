function toggleActive(activeClass, array, element) {
  array.forEach(item => item.classList.remove(activeClass));
  element.classList.add(activeClass);
}

export default toggleActive;