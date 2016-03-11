var evaluate = (function () {
  'use strict';

  function tokenize(str) {
    return str.match(/\d+\.?\d*|[a-zA-Z]+|\S/g);
  }

  function substitute(rpn, value) {
    while (rpn.indexOf('x') !== -1) {
      rpn[rpn.indexOf('x')] = Number(value);
    }
    return rpn;
  }

  function isNumeric(token) {
    return !!(!isNaN(token) && isFinite(token));
  }

  function isLetter(token) {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(token) !== -1;
  }

  function isOperator(token) {
    return '^*/+-'.indexOf(token) !== -1;
  }

  function performOperation(a, b, operation) {
    var ans = 0;
    switch (operation) {
    case '+':
      ans = a + b;
      break;
    case '-':
      ans = a - b;
      break;
    case '*':
      ans = a * b;
      break;
    case '/':
      ans = a / b;
      break;
    case '^':
      ans = (function (a, b) {
        var num = a;
        while (b > 1) {
          num *= a;
          b -= 1;
        }
        return num;
      }(a, b));
      break;
    default:
      break;
    }
    return ans;
  }

  function shuntingYard(infix) {
    var stack = [],
      queue = [],
      i = 0,
      token,
      token2,
      operators = {
        '^': {
          precedence: 4,
          associativity: 'Right'
        },
        '/': {
          precedence: 3,
          associativity: 'Left'
        },
        '*': {
          precedence: 3,
          associativity: 'Left'
        },
        '+': {
          precedence: 2,
          associativity: 'Left'
        },
        '-': {
          precedence: 2,
          associativity: 'Left'
        }
      };
    while (i < infix.length) {
      token = infix[i];

      if (isNumeric(token)) {
        queue.push(Number(token));
      } else if (isLetter(token)) {
        queue.push(token);
      } else if (isOperator(token)) {
        token2 = stack[stack.length - 1];
        while (isOperator(token2)
                && (operators[token].associativity === 'Left'
                && (operators[token].precedence <= operators[token2].precedence
                || operators[token].associativity === 'Right')
                && (operators[token].precedence < operators[token2].precedence))) {

          queue.push(stack.pop());
          token2 = stack[stack.length - 1];
        }
        stack.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack[stack.length - 1] !== '(') {
          queue.push(stack.pop());
        }
        stack.pop();
      }

      i += 1;
    }

    while (stack.length > 0) {
      queue.push(stack.pop());
    }

    return queue;
  }

  function evaluate(equation) {
    var a, b, stack = [];

    while (equation.length > 0) {
      if (isNumeric(equation[0])) {
        stack.push(equation.shift());
      } else if (isOperator(equation[0])) {
        b = stack.pop();
        a = stack.pop();
        stack.push(performOperation(a, b, equation.shift()));
      }
    }

    return stack[0];
  }

  return function (expression, value) {
    value = value || 0;
    var infix = tokenize(expression),
      rpn = substitute(shuntingYard(infix), value);

    return evaluate(rpn);
  };
}());

var calculus = (function () {
  "use strict";
  var self = this;

  self.f = function (func, x) {
    return evaluate(func, x);
  };

  self.df = function (func, x) {
    var h = 0.0001;
    return Math.round((self.f(func, x + h) - self.f(func, x)) / h);
  };

  self.newtonsMethod = function (func, guess) {
    var tmp = 0;
    while (Math.abs(guess - tmp) > 0.00001) {
      tmp = guess;
      guess = guess - (self.f(func, guess) / self.df(func, guess));
    }
    return guess;
  };

  return self;
}());