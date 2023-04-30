const caretPosition = {
  get(ctrl) {
    // IE >=9 and other browsers
    if (ctrl.selectionStart || ctrl.selectionStart === '0') {
      return { start: ctrl.selectionStart, end: ctrl.selectionEnd };
    }
    return { start: 0, end: 0 };
  },
  set(ctrl, start, end) {
    // IE < 9
    if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  },
};

export default caretPosition;
