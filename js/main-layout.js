const keyboard = {

  elements: {
    main: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('keyboard');
    this.elements.main.appendChild(this.createKeys());
    this.elements.keys = this.elements.main.querySelectorAll('.keyboard__key');
    document.body.appendChild(this.elements.main);
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const defaultKey = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ShiftRight',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl',
    ];
    const longKey = [
      'Backspace', 'CapsLock', 'Shift', 'Space',
    ];
    const middleKey = [
      'Enter', 'ShiftRight',
    ];
    const shortKey = [
      'Tab', 'Del',
    ];
    const specialKey = [
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl', '↑',
    ];

    defaultKey.forEach((item) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('key');

      if (shortKey.includes(item)) {
        keyElement.classList.add('keyboard__short-key');
        keyElement.textContent = item;

        if (item === 'Tab') {
          keyElement.addEventListener('click', () => {
            this.properties.value += '    ';
          });
        }
      } else if (longKey.includes(item)) {
        keyElement.classList.add('keyboard__long-key');
        keyElement.textContent = item;

        if (item === 'Backspace') {
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
          });
        }

        if (item === 'CapsLock') {
          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('keyboard__key--active');
            this.toggleCapsLock();
          });
        }

        if (item === 'Space') {
          keyElement.textContent = '';
          keyElement.classList.add('keyboard__space');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
          });
        }
      } else if (middleKey.includes(item)) {
        keyElement.classList.add('keyboard__middle-key');
        if (item === 'ShiftRight') {
          keyElement.textContent = 'Shift';
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
        keyElement.textContent = item;
      } else if (defaultKey.includes(item)) {
        keyElement.classList.add('keyboard__key');
        keyElement.textContent = item;
        keyElement.addEventListener('click', () => {
          this.properties.value += this.properties.capsLock
            ? item.toUpperCase() : item.toLowerCase();
        });
      }

      fragment.appendChild(keyElement);
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
};
export default keyboard;
