<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculo</title>

    <link rel="stylesheet" href="css/bootstrap.css">
</head>
<body>
<form action="/" method="post">

    <div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h1>Calculo</h1>
            </div>
            <div class="panel-body">
                <table>
                    <tbody>
                    <tr>
                        <td colspan="4">
                            <input type='text' id='query' name='query'>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button id='clear-all' type='button'>CA</button>
                        </td>
                        <td>
                            <button id='clear' type='button'>C</button>
                        </td>
                        <td>
                            <button id='backspace' type='button'><<</button>
                        </td>
                        <td>
                            <button id='divide' type='button'>/</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button id='seven' type='button'>7</button>
                        </td>
                        <td>
                            <button id='eight' type='button'>8</button>
                        </td>
                        <td>
                            <button id='nine' type='button'>9</button>
                        </td>
                        <td>
                            <button id='times' type='button'>X</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button id='four' type='button'>4</button>
                        </td>
                        <td>
                            <button id='five' type='button'>5</button>
                        </td>
                        <td>
                            <button id='six' type='button'>6</button>
                        </td>
                        <td>
                            <button id='plus' type='button'>+</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button id='one' type='button'>1</button>
                        </td>
                        <td>
                            <button id='two' type='button'>2</button>
                        </td>
                        <td>
                            <button id='three' type='button'>3</button>
                        </td>
                        <td>
                            <button id='minus' type='button'>-</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            <button id='zero' type='button'>0</button>
                        </td>
                        <td>
                            <button id='point' type='button'>.</button>
                        </td>
                        <td>
                            <button id='equals' type='button'>=</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="js/calculo.js"></script>
</body>
</html>