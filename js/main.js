import keyboard from './main-layout.js'; // eslint-disable-line

const header = document.createElement('h1');
header.textContent = 'RSS Виртуальная клавиатура';
document.body.append(header);

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
document.body.append(textarea);

keyboard.init();

document.querySelector('.keyboard').addEventListener('click', () => {
  // console.log(keyboard.properties.value);
  document.querySelector('.textarea').value = keyboard.properties.value;
});

const footer = document.createElement('p');
footer.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe ctrl + alt';
footer.classList.add('footer');
document.querySelector('div').after(footer);
