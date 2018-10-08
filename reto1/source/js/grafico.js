// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.



//FUNCION DEL GRAFICO
function drawChart() {
    // Create the data table

    var data2 = new google.visualization.DataTable();
    var hiddens = document.getElementsByClassName("dGrafico");


    data2.addColumn('string', 'DATOS');
    data2.addColumn('number', 'VALORES');
    for (var x = 0; x < hiddens.length; x++){
        data2.addRows([[hiddens[x].name,parseInt(hiddens[x].value)]]);
    }

    //OPCIONES DE TAMAÑO DEL GRAFICO, SE PUEDEN MOVER A CSS SIN PROBLEMAS AUNQUE NO SE COMO
    // Set chart options
    var options = {'title':'Estadisticas de uso:',
        pieHole:0.3, // ESTO ES PARA METERLE RADIO AL GRAFICO, SIN ESTO EL GRAFICO SERIA UN CIRCULO, NO UN DONUT
        'width':400,
        'height':300};

    //ESTO DE AQUI DIBUJA EL GRAFICO CUANDO TODOS LOS DATOS DE ARRIBA ESTAN LISTOS
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data2, options);
}