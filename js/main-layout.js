export const Keyboard = {
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
      'Backspace', 'CapsLock', 'Shift',
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
        this.properties.value = item;
      } else if (longKey.includes(item)) {
        keyElement.classList.add('keyboard__long-key');
        keyElement.textContent = item;
        this.properties.value = item;
        // if (item === 'Backspace') {
        //   keyElement.addEventListener('click', () => {
        //     this.properties.value = this.properties.value.substring(0, this.properties.valuelenght - 1);
        //     this.triggerEvent('oninput');
        //   })
        // }
      } else if (middleKey.includes(item)) {
        keyElement.classList.add('keyboard__middle-key');
        if (item === 'ShiftRight') {
          keyElement.textContent = 'Shift';
        } else {
          keyElement.textContent = item;
        }
        this.properties.value = item;
      } else if (item === 'Space') {
        keyElement.classList.add('keyboard__space');
        keyElement.textContent = '';
        this.properties.value = item;
      } else if (key.includes(item)) {
        keyElement.classList.add('keyboard__key');
        keyElement.textContent = item;
        this.properties.value = this.properties.capsLock ? item.toUpperCase() : item.toLowerCase();
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  },
  toggleCapsLock() {
    console.log('CapsLock toggled');
  },
};
