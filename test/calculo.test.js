TestCase("Evaluate Function", {
  "test f(x) 1" : function () {
    assertEquals(
      Calculator.truncate(Calculator.f('x^2+x/2', 6)),
      39
    );
  },
  "test f(x) 2" : function () {
    assertEquals(
      Calculator.truncate(Calculator.f('x^5-4', 2)),
      28
    );
  },
  "test f(x) 3" : function () {
    assertEquals(
      Calculator.truncate(Calculator.f('(x-4)+7x/5+4*(x-3)', 10)),
      48
    );
  },
  "test f(x) 4" : function () {
    assertEquals(
      Calculator.truncate(Calculator.f('x^3-x^2+4x-5', 5)),
      115
    );
  },
  "test f(x) 5" : function () {
    assertEquals(
      Calculator.truncate(Calculator.f('5*.2')),
      1
    );
  }
});

TestCase("Derivative", {
  "test df(x) 1" : function () {
    assertEquals(
      Calculator.truncate(Calculator.df('x^2+3x-4', 5)),
      13
    );
  },
  "test df(x) 2" : function () {
    assertEquals(
      Calculator.truncate(Calculator.df('x^3-x^2+4x-5', 5)),
      69
    );
  }
});

TestCase("Newton\'s Method", {
  "test newton 1" : function () {
    assertEquals(
      Calculator.truncate(Calculator.newtonsMethod('x^2-9', 3)),
      3
    );
  },
  "test newton 2" : function () {
    assertEquals(
      Calculator.truncate(Calculator.newtonsMethod('x^2-9', 5)),
      3
    );
  },
  "test newton 3" : function () {
    assertEquals(
      Calculator.truncate(Calculator.newtonsMethod('x^2-9', 2)),
      3
    );
  }
});

TestCase("Integral", {
  "test nInt(x, a, b) 1" : function () {
    assertEquals(
      Calculator.truncate(Calculator.integral('x^2+3x-4', 0, 5)),
      59.226
    );
  }
});

TestCase("Intersections", {
  "test intersections(func, func, a, b) 1" : function () {
    assertEquals(
      Calculator.getIntersections('x^2*.07', '-(x-3)^2+2', 0, 5),
      [1.655, 3.952]
    );
  }
});