export const keyboard = {

  elements: {
    main: null,
    keysContainer: null,
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
    document.body.appendChild(this.elements.main);
  },

  createKeys() {

    const fragment = document.createDocumentFragment();
    const key = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ShiftRight',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl',
    ];
    const longKey = [
      'Backspace', 'CapsLock', 'Shift', 'Space'
    ];
    const middleKey = [
      'Enter', 'ShiftRight',
    ];
    const shortKey = [
      'Tab', 'Del',
    ];

    key.forEach((item) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('key');

      if (shortKey.includes(item)) {

        keyElement.classList.add('keyboard__short-key');
        keyElement.textContent = item;
        // this.properties.value = item;

      } else if (longKey.includes(item)) {

        keyElement.classList.add('keyboard__long-key');
        keyElement.textContent = item;
        // this.properties.value = item;

        if (item === 'Backspace') {

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          })

        }

        if (item === 'CapsLock') {

          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('keyboard__key--active');
            if (keyElement.classList.contains('keyboard__key--active')) {
              this.properties.capsLock = true;
            } else {
              this.properties.capsLock = false;
            }
          })

        }

        if (item === 'Enter') {

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          })

        }

        if (item === 'Space') {

          keyElement.classList.add('keyboard__space');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          })

        }

      } else if (middleKey.includes(item)) {

        keyElement.classList.add('keyboard__middle-key');

        if (item === 'ShiftRight') {
          keyElement.textContent = 'Shift';
        } else {
          keyElement.textContent = item;
        }

        // this.properties.value = item;

      } else if (key.includes(item)) {

        keyElement.classList.add('keyboard__key');
        keyElement.textContent = item;

        keyElement.addEventListener('click', () => {
          this.properties.value += this.properties.capsLock ? item.toUpperCase() : item.toLowerCase();
          this.triggerEvent('oninput')
        })

      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  },

  toggleCapsLock() {
    console.log('CapsLock toggled');
  },

  triggerEvent(handlerName) {
    console.log('Event triggered. Handler Name: ' + handlerName);
  }
};
