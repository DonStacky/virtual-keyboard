const keyboard = {

  elements: {
    main: null,
    keys: [],
    shiftKey: [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
      '{', '}', '|', ':', '"', '<', '>', '?',
    ],
    unshiftKey: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      '[', ']', '\\', ';', "'", ',', '.', '/',
    ],
    shiftRuKey: [
      'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+',
      'Х', 'Ъ', '/', 'Ж', 'Э', 'Б', 'Ю', ',',
    ],
    unshiftRuKey: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      'х', 'ъ', '\\', 'ж', 'э', 'б', 'ю', '.',
    ],
    enLang: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
      'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
    ],
    rusLang: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
      'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
      'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
    ],
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    lang: 'en',
  },

  init(lang = 'en') {
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('keyboard');
    this.elements.main.appendChild(this.createKeys(lang));
    this.elements.keys = this.elements.main.querySelectorAll('.keyboard__key');
    document.querySelector('.footer').before(this.elements.main);
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const defaultKey = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
    ];
    const longKey = [
      'Backspace', 'CapsLock', 'Shift', 'Space',
    ];
    const middleKey = [
      'Enter', 'ShiftRight',
    ];
    const shortKey = [
      'Tab', 'Delete',
    ];
    const specialKey = [
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight', 'ArrowUp',
    ];

    defaultKey.forEach((item) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('key');

      if (shortKey.includes(item)) {
        keyElement.classList.add('keyboard__short-key');
        keyElement.textContent = item;
        if (item === 'Delete') {
          keyElement.textContent = 'Del';
          keyElement.setAttribute('name', 'Delete');
          keyElement.addEventListener('click', () => {
            const position = document.querySelector('.textarea').selectionStart;
            this.properties.value = `${this.properties.value.slice(0, position)}${this.properties.value.slice(position + 1)}`;
          });
        } else if (item === 'Tab') {
          keyElement.addEventListener('click', () => {
            this.properties.value += '\t';
          });
        }
      } else if (longKey.includes(item)) {
        keyElement.classList.add('keyboard__long-key');
        keyElement.textContent = item;

        if (item === 'Backspace') {
          keyElement.addEventListener('click', () => {
            const position = document.querySelector('.textarea').selectionStart;
            this.properties.value = `${this.properties.value.slice(0, position - 1)}${this.properties.value.slice(position)}`;
          });
        }

        if (item === 'CapsLock') {
          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('keyboard__key--active');
            this.toggleCapsLock();
          });
        }

        if (item === 'Space') {
          keyElement.textContent = ' ';
          keyElement.classList.add('keyboard__space');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
          });
        }
      } else if (middleKey.includes(item)) {
        keyElement.classList.add('keyboard__middle-key');
        if (item === 'ShiftRight') {
          keyElement.textContent = 'Shift';
          keyElement.setAttribute('name', 'ShiftRight');
        } else {
          keyElement.textContent = item;
        }
        if (item === 'Enter') {
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
          });
        }
      } else if (specialKey.includes(item)) {
        keyElement.classList.add('keyboard__special-key');
        if (item === 'AltRight') {
          keyElement.textContent = 'Alt';
          keyElement.setAttribute('name', 'AltRight');
        } else if (item === 'AltLeft') {
          keyElement.textContent = 'Alt';
          keyElement.setAttribute('name', 'AltLeft');
        } else if (item === 'ControlLeft') {
          keyElement.textContent = 'Ctrl';
          keyElement.setAttribute('name', 'ControlLeft');
        } else if (item === 'ControlRight') {
          keyElement.textContent = 'Ctrl';
          keyElement.setAttribute('name', 'ControlRight');
        } else if (item === 'MetaLeft') {
          keyElement.textContent = 'Win';
          keyElement.setAttribute('name', 'MetaLeft');
        } else if (item === 'ArrowLeft') {
          keyElement.textContent = '←';
          keyElement.addEventListener('click', () => {
            this.properties.value += '←';
          });
          keyElement.setAttribute('name', 'ArrowLeft');
        } else if (item === 'ArrowRight') {
          keyElement.textContent = '→';
          keyElement.addEventListener('click', () => {
            this.properties.value += '→';
          });
          keyElement.setAttribute('name', 'ArrowRight');
        } else if (item === 'ArrowUp') {
          keyElement.textContent = '↑';
          keyElement.addEventListener('click', () => {
            this.properties.value += '↑';
          });
          keyElement.setAttribute('name', 'ArrowUp');
        } else if (item === 'ArrowDown') {
          keyElement.textContent = '↓';
          keyElement.addEventListener('click', () => {
            this.properties.value += '↓';
          });
          keyElement.setAttribute('name', 'ArrowDown');
        } else {
          keyElement.textContent = item;
        }
      } else if (defaultKey.includes(item)) {
        keyElement.classList.add('keyboard__key');
        keyElement.textContent = item;
      }

      fragment.appendChild(keyElement);
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.keydown('.keyboard__space', event);
        this.properties.value += ' ';
      } else if (event.code === 'AltLeft') {
        event.preventDefault();
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'AltLeft') {
            item.classList.add('keyboard__key--active');
          }
        });
      } else if (event.code === 'AltRight') {
        event.preventDefault();
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'AltRight') {
            item.classList.add('keyboard__key--active');
          }
        });
      } else if (event.code === 'Delete') {
        document.querySelectorAll('.keyboard__short-key').forEach((item) => {
          if (item.getAttribute('name') === 'Delete') {
            item.classList.add('keyboard__key--active');
          }
        });
        const position = document.querySelector('.textarea').selectionStart;
        this.properties.value = `${this.properties.value.slice(0, position)}${this.properties.value.slice(position + 1)}`;
      } else if (event.code === 'MetaLeft') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'MetaLeft') {
            item.classList.add('keyboard__key--active');
          }
        });
      } else if (event.code === 'ControlLeft') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ControlLeft') {
            item.classList.add('keyboard__key--active');
          }
        });
      } else if (event.code === 'ControlRight') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ControlRight') {
            item.classList.add('keyboard__key--active');
          }
        });
      } else if (event.code === 'ShiftRight' && !event.repeat && !this.properties.shift) {
        this.toggleShift();
        document.querySelectorAll('.keyboard__middle-key').forEach((item) => {
          if (item.getAttribute('name') === 'ShiftRight') {
            item.classList.add('keyboard__key--active');
          }
        });
      } else if (event.code === 'ArrowLeft') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowLeft') {
            item.classList.add('keyboard__key--active');
            this.properties.value += '←';
          }
        });
      } else if (event.code === 'ArrowRight') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowRight') {
            item.classList.add('keyboard__key--active');
            this.properties.value += '→';
          }
        });
      } else if (event.code === 'ArrowUp') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowUp') {
            item.classList.add('keyboard__key--active');
            this.properties.value += '↑';
          }
        });
      } else if (event.code === 'ArrowDown') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowDown') {
            item.classList.add('keyboard__key--active');
            this.properties.value += '↓';
          }
        });
      } else if (event.key === 'Shift' && !event.repeat) {
        this.toggleShift();
        this.keydown('.keyboard__long-key', event);
      } else if (event.key === 'Delete') {
        this.keydown('.keyboard__special-key', event);
      } else if (event.key === 'CapsLock') {
        this.keytoggle('.keyboard__long-key', event);
        this.toggleCapsLock();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        this.keydown('.keyboard__short-key', event);
        this.properties.value += '\t';
      } else if (event.key === 'Enter') {
        this.keydown('.keyboard__middle-key', event);
        this.properties.value += '\n';
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        this.keydown('.keyboard__long-key', event);
        const position = document.querySelector('.textarea').selectionStart;
        this.properties.value = `${this.properties.value.slice(0, position - 1)}${this.properties.value.slice(position)}`;
      } else if (defaultKey.includes(event.key.toLowerCase())) {
        event.preventDefault();
        if (this.properties.lang === 'en') {
          this.keydown('.keyboard__key', event);
        }
        if (this.properties.lang === 'en' && event.key) {
          this.properties.value += event.key;
        } else if (this.properties.lang === 'ru') {
          if (this.properties.shift === false) {
            let index = 0;
            document.querySelectorAll('.keyboard__key').forEach(() => {
              if (event.key === this.elements.enLang[index]) {
                this.properties.value += this.elements.rusLang[index];
              }
              index += 1;
            });
          }
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        this.keyup('.keyboard__space', event);
      } else if (event.key === 'Alt') {
        this.keyup('.keyboard__special-key', event);
      } else if (event.code === 'MetaLeft') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'MetaLeft') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'Delete') {
        document.querySelectorAll('.keyboard__short-key').forEach((item) => {
          if (item.getAttribute('name') === 'Delete') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ControlLeft') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ControlLeft') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ControlRight') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ControlRight') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ShiftRight' && this.properties.shift) {
        this.toggleShift();
        document.querySelectorAll('.keyboard__middle-key').forEach((item) => {
          if (item.getAttribute('name') === 'ShiftRight') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ArrowLeft') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowLeft') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ArrowRight') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowRight') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ArrowUp') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowUp') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.code === 'ArrowDown') {
        document.querySelectorAll('.keyboard__special-key').forEach((item) => {
          if (item.getAttribute('name') === 'ArrowDown') {
            item.classList.remove('keyboard__key--active');
          }
        });
      } else if (event.key === 'Shift') {
        this.keyup('.keyboard__long-key', event);
        this.toggleShift();
      } else if (event.key === 'Del') {
        this.keyup('.keyboard__special-key', event);
      } else if (event.key === 'Tab') {
        this.keyup('.keyboard__short-key', event);
      } else if (event.key === 'Enter') {
        this.keyup('.keyboard__middle-key', event);
      } else if (event.key === 'Backspace') {
        this.keyup('.keyboard__long-key', event);
      } else if (defaultKey.includes(event.key.toLowerCase())) {
        this.keyup('.keyboard__key', event);
      }
    });

    return fragment;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((item) => {
      const key = item;
      key.textContent = this.properties.capsLock
        ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    });
  },

  toggleShift() {
    if (this.properties.lang === 'en') {
      this.properties.shift = !this.properties.shift;
      let i = 0;
      this.elements.keys.forEach((item) => {
        const key = item;
        if (this.elements.unshiftKey.includes(item.innerHTML)
          || this.elements.shiftKey.includes(item.innerHTML)
          || item.innerHTML === '&amp;' || item.innerHTML === '&lt;' || item.innerHTML === '&gt;') {
          key.textContent = this.properties.shift
            ? this.elements.shiftKey[i] : this.elements.unshiftKey[i];
        } else {
          key.textContent = this.properties.shift
            ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          i -= 1;
        }
        i += 1;
      });
    } else if (this.properties.lang === 'ru') {
      this.properties.shift = !this.properties.shift;
      let i = 0;
      this.elements.keys.forEach((item) => {
        const key = item;
        if (this.elements.unshiftRuKey.includes(item.innerHTML)
          || this.elements.shiftRuKey.includes(item.innerHTML)) {
          key.textContent = this.properties.shift
            ? this.elements.shiftRuKey[i] : this.elements.unshiftRuKey[i];
        } else {
          key.textContent = this.properties.shift
            ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          i -= 1;
        }
        i += 1;
      });
    }
  },

  toggleLang() {
    if (this.properties.lang === 'en') {
      this.properties.lang = 'ru';
    } else {
      this.properties.lang = 'en';
    }
    let i = 0;
    this.elements.keys.forEach((item) => {
      const key = item;
      if (this.elements.enLang.includes(item.innerHTML)
        || this.elements.rusLang.includes(item.innerHTML)) {
        key.textContent = this.properties.lang === 'en'
          ? this.elements.enLang[i] : this.elements.rusLang[i];
      }
      i += 1;
    });
  },

  setLang() {
    let i = 0;
    this.elements.keys.forEach((item) => {
      const key = item;
      if (this.elements.enLang.includes(item.innerHTML)
        || this.elements.rusLang.includes(item.innerHTML)) {
        key.textContent = this.properties.lang === 'en'
          ? this.elements.enLang[i] : this.elements.rusLang[i];
      }
      i += 1;
    });
  },

  keyup(className, eventObj) {
    document.querySelectorAll(className).forEach((item) => {
      if (item.innerHTML === eventObj.key) {
        item.classList.remove('keyboard__key--active');
      }
    });
  },

  keydown(className, eventObj) {
    document.querySelectorAll(className).forEach((item) => {
      if (item.innerHTML === eventObj.key) {
        item.classList.add('keyboard__key--active');
      }
    });
  },

  keytoggle(className, eventObj) {
    document.querySelectorAll(className).forEach((item) => {
      if (item.innerHTML === eventObj.key) {
        item.classList.toggle('keyboard__key--active');
      }
    });
  },

};

export default keyboard;
