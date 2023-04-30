import keyboard from './main-layout.js'; // eslint-disable-line

const header = document.createElement('h1');
header.textContent = 'RSS Виртуальная клавиатура';
document.body.append(header);

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
document.body.append(textarea);

const footer = document.createElement('p');
footer.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe ctrl + alt';
footer.classList.add('footer');
textarea.after(footer);

keyboard.init();

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
});

document.addEventListener('keyup', (event) => {
  if (keyboard.elements.shiftKey.includes(event.key)) {
    document.querySelectorAll('.keyboard__key').forEach((item) => {
      item.classList.remove('keyboard__key--active');
    });
  }
});

document.querySelector('.keyboard').addEventListener('click', () => {
  textarea.focus();
  document.querySelector('.textarea').value = keyboard.properties.value;
});
document.addEventListener('keydown', () => {
  textarea.focus();
  document.querySelector('.textarea').value = keyboard.properties.value;
});

// document.addEventListener('keydown', () => {
//   console.log(caretPosition.get(textarea));
// });

// const caretPosition = {
//   get : function (ctrl) {
//          // IE >=9 and other browsers
//        if (ctrl.selectionStart || ctrl.selectionStart == '0') {
//            return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
//        } else {
//            return {'start': 0, 'end': 0};
//        }
//    },
//   set :function (ctrl, start, end) {
//         // IE < 9
//        if (ctrl.createTextRange) {
//            let range = ctrl.createTextRange();
//            range.collapse(true);
//            range.moveEnd('character', end);
//            range.moveStart('character', start);
//            range.select();
//        }
//    }
// };

// console.log(caretPosition.get(textarea));
