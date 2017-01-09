(function (window) {
  "use strict";

  var Calculator;
  Calculator = new (function () {
    var self = this;

    /**
     * Insert a character into the function.
     *
     * @param {string} character to add to the function
     */
    self.put = function (character) {
      console.log(character);
    };

    /**
     * Scroll the tabs to the right.
     */
    self.next_tab = function () {
      var tabs = document.getElementById('tabs');
      tabs.style.left = (tabs.offsetLeft - 50) + "px";

      if ((tabs.offsetLeft - 50) < 0) {
        document.getElementById('last-tab').className = 'last-tabs';
      }
    };

    /**
     * Scroll the tabs to the left.
     */
    self.last_tab = function () {
      var tabs = document.getElementById('tabs');
      tabs.style.left = (tabs.offsetLeft + 50) + "px";

      if ((tabs.offsetLeft + 50) >= 0) {
        document.getElementById('last-tab').className += ' hidden';
      }
    };

    /**
     * Find all UI buttons to listen for presses.
     */
    self.init = function () {
      var valueButtons = document.querySelectorAll('[data-value]'),
          actionButtons = document.querySelectorAll('[data-action]'),
          button;

      for (let i = 0; i < valueButtons.length; i++) {
        button = valueButtons[i];
        button.onclick = () => self.put(this.getAttribute('data-value'));
      }

      for (let i = 0; i < actionButtons.length; i++) {
        button = actionButtons[i];

        let fn = self[button.getAttribute('data-action')];
        if (typeof fn === 'function')
          button.onclick = () => fn();
      }
    };

    return self;
  })();

  Calculator.init();
  window.Calculator = Calculator;
})(window);