(function (window) {
  "use strict";

  var Calculator;
  Calculator = new (function () {
    var self = this,
        evaluate;

    /**
     * Self-contained evaluate function
     *
     * @type {function}
     */
    evaluate = (function () {

      /**
       * Tokenizes the equation so that the shunting yard algorithm can understand it
       *
       * @param {string} str String format of the equation to be tokenized
       * @param {number} value Value to plug in for 'x'
       * @returns {string} Infix Notation of the string, now ready for the shunting yard algorithm
       */
      function tokenize(str, value) {
        return str.replace(/(\w+\^\w+)/g, '($1)') // -x^2 => -(x^2)
                    .replace(/(\-\((.+)\))/g, '-1*($2)') // -(5+4) => -1*(5+4)
                      .replace(/(\-\w+)/g, '+$1') // 5-x+4 => 5 + -x + 4
                        .replace(/(([\d\.]+)([a-zA-Z]+))/g, '$2*$3') // 5x => 5*x
                          .replace(/x/g, value) // 5*x => 5*4
                            .match(/(-\w+)|([\w\.]+)|([\(\)\+\^\*\/\-])/g);  // properly tokens the remaining string
      }

      /**
       * Checks if given token is a number
       *
       * @param {string} token String that might be a number
       * @returns {boolean} True if the token is a number
       */
      function isNumeric(token) {
        return !!(!isNaN(token) && isFinite(token));
      }

      /**
       * Checks if given token is an alphabetic letter
       *
       * @param {string} token String that might be a letter
       * @returns {boolean} True if token is a letter
       */
      function isLetter(token) {
        return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(token) !== -1;
      }

      /**
       * Checks if given token is an arithmetic operation (+, -, /, *)
       *
       * @param {string} token String that might be an operation
       * @returns {boolean} True if token is an operation
       */
      function isOperator(token) {
        return '^*/+-'.indexOf(token) !== -1;
      }

      /**
       * Performs a single operation on two numbers and returns the result
       *
       * @param {number} a First number
       * @param {number} b Second number
       * @param {string} operation Operation to be executed
       * @returns {number} Result of the operation
       */
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

      /**
       * The Shunting Yard Algorithm converts infix notation to reverse-polish notation
       *     that the the computer can solve.
       *
       * @param {string} infix Infix notation of the equation
       * @returns {Array} Reverse Polish notation of the equation
       */
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

      /**
       * Evaluates the Reverse Polish equation piece-by-piece and returns the answer
       *     to the entire equation.
       *
       * @param {Array} equation Reverse Polish notation of the given equation to solve
       * @returns {number} Answer to the entire equation
       */
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

      /**
       * Returns the answer to the user after solving the equation
       *
       * @param {string} expression Infix notation of the equation to be solved
       * @param {value} value Point to evaluate the expression at
       * @returns {number} Answer to the equation
       */
      return function (expression, value) {
        value = value || 0;
        return solve(shuntingYard(tokenize(expression, value)));  // solve the reverse polish notation of the tokened infix expression
      };
    }());

    /**
     * Truncates a decimal at 3 places
     * 
     * @param {number} num Number with a long decimal
     * @returns {number} Number with a 3 digit decimal
     */
    self.truncate = function (num) {
      return Math.trunc(num * 1000) / 1000;
    };

    /**
     * Evaluates a the given function at a point
     * 
     * @param {string} func Infix notation of the equation
     * @param {number} x Point to evaluate the expression at
     * @returns {number} Answer to the equation
     */
    self.f = function (func, x) {
      return evaluate(func, x);
    };

    /**
     * Calculates the derivative (slope) of the given function at a point
     * 
     * @param {string} func Infix notation of the equation to find the direvative of
     * @param {number} x Point to evaluate the derivative at
     * @returns {number} Derivative of the function at the given point
     */
    self.df = function (func, x) {
      var h = 0.0000001;
      return (self.f(func, x + h) - self.f(func, x)) / h;
    };

    /**
     * Finds the nearest x-intercept of the given function to the given point
     * 
     * @param {string} func Infix notation of the equation
     * @param {number} guess Finds the x-intercept closest to this point
     * @returns {number} The x value of the x-intercept closest to the guess
     */
    self.newtonsMethod = function (func, guess) {
      var tmp = 0;
      while (Math.abs(guess - tmp) > 0.0000001) {
        tmp = guess;
        guess = guess - (self.f(func, guess) / self.df(func, guess));
      }
      return guess;
    };

    /**
     * Calculates the integral of a function between two points
     * 
     * @param {string} func Infix notation of the equation to find the integral of
     * @param {number} beginning Left bound of the integral
     * @param {number} end Right bound of the integral
     * @returns {number} Integral of the function between the given points
     */
    self.integral = function (func, beginning, end) {
      var width = (end - beginning) / 1000,
        point,
        height,
        multiplierToggle = 0,
        integral = 0;

      for (point = beginning; point <= end; point += width) {
        height = self.f(func, point);
        if (point === beginning || point === end) {
          integral += height;
        } else {
          multiplierToggle = !multiplierToggle;
          integral += height * (multiplierToggle + 1) * 2.0;
        }
      }
      return integral * (width / 3.0);
    };

    /**
     * Gets all of the intersections of two functions
     *
     * @param {string} func1 First function
     * @param {string} func2 Second function
     * @param {number} a Left bound to search for intersects
     * @param {number} b Right bound to search for intersects
     * @returns {Array} List of all intersection points
     */
    self.getIntersections = function (func1, func2, a, b) {
      var intersections = [],
        x = a;
      while (x <= b) {
        if (intersections.indexOf(x) === -1) {
          if (Math.abs(self.f(func1, x) - self.f(func2, x)) <= 0.0001) {
            intersections.push(self.truncate(x));
          }
        }
        x += 0.0001;
      }

      return intersections;
    };

    /**
     * Calculates the area between two functions
     *
     * @param {string} func1 First function
     * @param {string} func2 Second function
     * @param {number} a Left bound
     * @param {number} b Right bound
     * @returns {number} Area between functions
     */
    self.areaBetween = function (func1, func2, a, b) {
      var area = 0,
        intersections,
        integral,
        right,
        left = a;

      intersections = self.getIntersections(func1, func2, a, b);

      integral = function (iFunc1, iFunc2, iA, iB) {
        var x = (iB - iA) / 2;
        return (self.f(iFunc1, x) > self.f(iFunc2, x)) ? // discover which is on top
                  self.integral(iFunc1, iA, iB) - self.integral(iFunc2, iA, iB) : // first function on top
                    self.integral(iFunc2, iA, iB) - self.integral(iFunc1, iA, iB); // second function on top
      };

      while (intersections.length > 0) {
        right = intersections.shift();
        area += integral(func1, func2, left, right);
        left = right;
      }
      right = b;

      area += integral(func1, func2, left, right);

      return area;
    };

    return self;
  })();

  window.Calculator = Calculator;
})(window);
