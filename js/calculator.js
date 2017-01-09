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
      var containerId = document.querySelectorAll('div[data-active]')[0].getAttribute('id'),
        equation = document.getElementById(containerId + '_function');

      equation.value += character;
    };

    /**
     * Evaluate a function and display the result.
     */
    self.equals = function () {
      var container = document.querySelectorAll('div[data-active]')[0],
        func = container.getAttribute('data-function'),
        containerId = container.getAttribute('id'),
        label = document.querySelectorAll('label[for="' + containerId + '_function"]')[0],
        equation = document.getElementById(containerId + '_function'),
        x = document.getElementById(containerId + '_x');

      var fn = window.Calculo[func];
      if (typeof fn === 'function') {
        label.innerHTML = equation.value + '&nbsp;&nbsp;;&nbsp;&nbsp;x=' + (x.value || 0);
        equation.value = window.Calculo.truncate(fn(equation.value.toString(), Number(x.value)));
      }
    };

    /**
     * Switch to a different tab.
     *
     * @param {HTMLElement} tabButton to switch to
     */
    self.switch_tab = function (tabButton) {
      var otherTabs = document.querySelectorAll('[data-target]');
      var tabContent = document.getElementById(tabButton.getAttribute('data-target'));

      for (let i = 0; i < otherTabs.length; i++) {
        let oTab = otherTabs[i];
        let oTabContent = document.getElementById(oTab.getAttribute('data-target'));

        if (oTab.getAttribute('data-active') || oTabContent.getAttribute('data-active')) {
          oTab.removeAttribute('data-active');
          oTabContent.removeAttribute('data-active');
        }
      }

      tabButton.setAttribute('data-active', 'true');
      tabContent.setAttribute('data-active', 'true');
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
          tabs = document.querySelectorAll('[data-target]');

      for (let i = 0; i < valueButtons.length; i++) {
        let button = valueButtons[i];
        let char = button.getAttribute('data-value');
        button.onclick = () => self.put(char);
      }

      for (let i = 0; i < actionButtons.length; i++) {
        let button = actionButtons[i];

        let fn = self[button.getAttribute('data-action')];
        if (typeof fn === 'function')
          button.onclick = () => fn();
      }

      for (let i = 0; i < tabs.length; i++) {
        let button = tabs[i];
        button.onclick = () => self.switch_tab(button);
      }

      window.onkeypress = (e) => { if (e.keyCode == 13) self.equals() };
    };

    return self;
  })();

  Calculator.init();
  window.Calculator = Calculator;
})(window);