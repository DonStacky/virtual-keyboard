import keyboard  from './main-layout.js'; // eslint-disable-line

const header = document.createElement('h1');
header.textContent = 'RSS Виртуальная клавиатура';
document.body.append(header);

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
document.body.append(textarea);

const footer = document.createElement('p');
footer.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe ctrl + alt<br>Пожалуйста, перед проверкой убедитесь, что в операционной системе стоит английская раскладка';
footer.classList.add('footer');
textarea.after(footer);

keyboard.init(keyboard.properties.lang);

document.querySelectorAll('.keyboard__key').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    const { target } = event;
    if (target.innerHTML === '&amp;') {
      keyboard.properties.value += '&';
    } else if (target.innerHTML === '&lt;') {
      keyboard.properties.value += '<';
    } else if (target.innerHTML === '&gt;') {
      keyboard.properties.value += '>';
    } else {
      keyboard.properties.value += target.innerHTML;
    }
  });
});

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (keyboard.elements.shiftKey.includes(event.key)) {
    if (keyboard.properties.lang === 'en') {
      keyboard.properties.value += event.key;
      document.querySelectorAll('.keyboard__key').forEach((item) => {
        if (item.innerHTML === event.key) {
          item.classList.add('keyboard__key--active');
        } else if (event.key === '&' && item.innerHTML === '&amp;') {
          item.classList.add('keyboard__key--active');
        } else if (event.key === '<' && item.innerHTML === '&lt;') {
          item.classList.add('keyboard__key--active');
        } else if (event.key === '>' && item.innerHTML === '&gt;') {
          item.classList.add('keyboard__key--active');
        }
      });
    }
  }
  if (keyboard.properties.lang === 'ru') {
    for (let i = 0; i < keyboard.elements.shiftKey.length; i += 1) {
      if (keyboard.elements.shiftKey.includes(event.key)) {
        if (event.key === keyboard.elements.shiftKey[i]) {
          keyboard.properties.value += keyboard.elements.shiftRuKey[i];
        }
      }
    }

    for (let i = 0; i < keyboard.elements.enLang.length; i += 1) {
      if (keyboard.elements.enLang.includes(event.key.toLowerCase())) {
        if (event.key === keyboard.elements.enLang[i].toUpperCase()) {
          keyboard.properties.value += keyboard.elements.rusLang[i].toUpperCase();
        }
      }
    }
  }
});

document.addEventListener('keydown', (event) => {
  document.querySelectorAll('.keyboard__key').forEach((item, index) => {
    if (event.key === keyboard.elements.enLang[index]) {
      if (keyboard.elements.rusLang[index] === item.innerHTML) {
        item.classList.add('keyboard__key--active');
      }
    }
    if (event.key === keyboard.elements.enLang[index].toUpperCase()) {
      if (keyboard.elements.rusLang[index].toUpperCase() === item.innerHTML) {
        item.classList.add('keyboard__key--active');
      }
    }
    for (let i = 0; i < keyboard.elements.shiftKey.length; i += 1) {
      if (event.key === keyboard.elements.shiftKey[i]) {
        if (keyboard.elements.shiftRuKey[i] === item.innerHTML) {
          item.classList.add('keyboard__key--active');
        }
      }
    }
  });
});

document.addEventListener('keyup', () => {
  document.querySelectorAll('.keyboard__key').forEach((item) => {
    item.classList.remove('keyboard__key--active');
  });
});

document.querySelector('.keyboard').addEventListener('click', () => {
  textarea.focus();
  document.querySelector('.textarea').value = keyboard.properties.value;
});
document.addEventListener('keydown', () => {
  textarea.focus();
  document.querySelector('.textarea').value = keyboard.properties.value;
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'AltLeft') {
    document.onkeyup = (target) => {
      if (target.code === 'ControlLeft') {
        keyboard.toggleLang();
      } else {
        document.onkeyup = null;
      }
    };
  } else if (event.code === 'ControlLeft') {
    document.onkeyup = (target) => {
      if (target.code === 'AltLeft') {
        keyboard.toggleLang();
      } else {
        document.onkeyup = null;
      }
    };
  }
});

function setLocalStorage() {
  localStorage.setItem('lang', keyboard.properties.lang);
}

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    keyboard.properties.lang = localStorage.getItem('lang');
    keyboard.setLang();
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
