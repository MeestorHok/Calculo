TestCase("Evaluate Function", {
  "test f(x) 1" : function () {
    assertEquals(
      Calculator.f('x^2+x/2', 6),
      39
    );
  },
  "test f(x) 2" : function () {
    assertEquals(
      Calculator.f('x^5-4', 2),
      28
    );
  },
  "test f(x) 3" : function () {
    assertEquals(
      Calculator.f('(x-4)^2+7*x/5+4*(x-3)', 10),
      22
    );
  }
});

TestCase("Derivative", {
  "test df(x) 1" : function () {
    assertEquals(
      Calculator.df('x^2+3x-4', 5),
      13
    );
  },
  "test df(x) 2" : function () {
    assertEquals(
      Calculator.df('x^3-x^2+4*x-5', 5),
      69
    );
  }
});

TestCase("Newton\'s Method", {
  "test newton 1" : function () {
    assertEquals(
      Calculator.newtonsMethod('x^2-9', 3),
      3
    );
  },
  "test newton 2" : function () {
    assertEquals(
      Calculator.newtonsMethod('x^2-9', 5),
      3
    );
  },
  "test newton 3" : function () {
    assertEquals(
      Calculator.newtonsMethod('x^2-9', 2),
      3
    );
  }
});