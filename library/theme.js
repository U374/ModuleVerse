let themeBtn = document.querySelector('#theme-btn');
let body = document.body;

// Check if there's a saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
}

let badlaw = () => {
  body.classList.toggle("dark-theme");

  // Save the theme choice to localStorage
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
}

themeBtn.addEventListener('click', badlaw);