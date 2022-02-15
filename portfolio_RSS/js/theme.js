function setTheme(theme) {
  if (theme === 'light') {
    if (document.body.classList.contains('light-theme')) return;
    else {
      document.body.classList.add('light-theme')
      changeColors()
    }
  }
  else {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme')
      changeColors()
    }
  }
}

function changeColors() {
  if (document.body.classList.contains('light-theme')) {
    document.documentElement.style.setProperty('--bg-color', '#FFFFFF');
    document.documentElement.style.setProperty('--color', '#1C1C1C');
  }
  else {
    document.documentElement.style.setProperty('--bg-color', '#000000');
    document.documentElement.style.setProperty('--color', '#FFFFFF');
  }
}

export { changeColors, setTheme }