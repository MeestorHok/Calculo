(function (window) {
  "use strict";

  var Calculator;
  Calculator = new (function () {
    var self = this,
      evaluate = (function () {
        function tokenize(str, value) {
          return str.replace(/(\w+\^\w+)/g, '($1)')  // -x^2 => -(x^2)
                      .replace(/(\-\((.+)\))/g, '-1*($2)')  // -(5+4) => -1*(5+4)
                        .replace(/(\-\w+)/g, '+$1')  // 5-x+4 => 5 + -x + 4
                          .replace(/(([\d\.]+)([a-zA-Z]+))/g, '$2*$3')  // 5x => 5*x
                            .replace(/x/g, value)  // 5*x => 5*4
                              .match(/(-\w+)|([\w\.]+)|([\(\)\+\^\*\/\-])/g);  // properly tokens the remaining string
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
            ans = Math.pow(a, b);
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

        function solve(equation) {
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
          return solve(shuntingYard(tokenize(expression, value)));  // solve the reverse polish notation of the tokened infix expression
        };
      }());

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
  })();

  window.Calculator = Calculator;
})(window);