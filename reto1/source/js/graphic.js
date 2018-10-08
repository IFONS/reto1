// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Create the data table.
    /*
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);
    */

    var data2 = new google.visualization.arrayToDataTable
    ([
        ['DATOS', 'VALORES'],
        ['Tiempo Total en Marcha',tLife],
        ['Tiempo de Emergencia', tEmergency],
        ['Ciclos Totales',tCiclos]
    ]);
    var h = $("#chart_div").height();
    var w = $("#chart_div").width();
    var options = {'title':'Estadisticas de uso:',
        pieHole:0.3, // ESTO ES PARA METERLE RADIO AL GRAFICO, SIN ESTO EL GRAFICO SERIA UN CIRCULO, NO UN DONUT
        'width':w,
        'height':h};

    //ESTO DE AQUI DIBUJA EL GRAFICO CUANDO TODOS LOS DATOS DE ARRIBA ESTAN LISTOS

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data2, options);
}