<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculo</title>

    <link rel="stylesheet" href="css/bootstrap.css">

    <style>
        .no-gutter > [class*='col-'] {
            padding-right:0;
            padding-left:0;
        }
        .btn {
            border-radius: 0;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h1>Calculo</h1>
            </div>
            <div class="panel-body row">
                <div class="col-xs-8 col-xs-offset-2">
                    <div>
                        <input type='text' id='query' name='query'>
                    </div>

                    <div class="row no-gutter">
                        <div class="col-xs-3">
                            <button id='clear-all' type='button' class="btn btn-primary btn-lg btn-block">CA</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='clear' type='button' class="btn btn-primary btn-lg btn-block">C</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='backspace' type='button' class="btn btn-primary btn-lg btn-block"><<</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='divide' type='button' class="btn btn-primary btn-lg btn-block">/</button>
                        </div>
                    </div>
                    <div class="row no-gutter">
                        <div class="col-xs-3">
                            <button id='seven' type='button' class="btn btn-primary btn-lg btn-block">7</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='eight' type='button' class="btn btn-primary btn-lg btn-block">8</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='nine' type='button' class="btn btn-primary btn-lg btn-block">9</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='times' type='button' class="btn btn-primary btn-lg btn-block">X</button>
                        </div>
                    </div>
                    <div class="row no-gutter">
                        <div class="col-xs-3">
                            <button id='four' type='button' class="btn btn-primary btn-lg btn-block">4</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='five' type='button' class="btn btn-primary btn-lg btn-block">5</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='six' type='button' class="btn btn-primary btn-lg btn-block">6</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='plus' type='button' class="btn btn-primary btn-lg btn-block">+</button>
                        </div>
                    </div>
                    <div class="row no-gutter">
                        <div class="col-xs-3">
                            <button id='one' type='button' class="btn btn-primary btn-lg btn-block">1</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='two' type='button' class="btn btn-primary btn-lg btn-block">2</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='three' type='button' class="btn btn-primary btn-lg btn-block">3</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='minus' type='button' class="btn btn-primary btn-lg btn-block">-</button>
                        </div>
                    </div>
                    <div class="row no-gutter">
                        <div class="col-xs-6">
                            <button id='zero' type='button' class="btn btn-primary btn-lg btn-block">0</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='point' type='button' class="btn btn-primary btn-lg btn-block">.</button>
                        </div>
                        <div class="col-xs-3">
                            <button id='equals' type='button' class="btn btn-primary btn-lg btn-block">=</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/calculo.js"></script>
</body>
</html>