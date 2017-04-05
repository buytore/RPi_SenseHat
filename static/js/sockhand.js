google.charts.load('current', {'packages': ['gauge', 'corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data0 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Humidity', 0]
    ]);
    var data1 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Pressure', 0]
    ]);
    var data2 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Temp', 0]
    ]);
    var data3 = new google.visualization.DataTable()
        data3.addColumn('date', 'Date');
        data3.addColumn('number', 'Temp');
        data3.addRow([new Date(2017, 3, 3, 19, 01, 23), 22]);

    var options0 = {
        width: 200, height: 240,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };
    var options2 = {
        width: 200, height: 240,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };
    var options1 = {
        width: 200, height: 240,
        redFrom: 1001, redTo: 1500,
        yellowFrom: 501, yellowTo: 1000,
        minorTicks: 5,
        max: 1500
    };
    var options3 = {
        width: 600, height: 240,
        title: 'Stream Data',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
          ticks: [new Date(2017, 3, 3, 20, 00, 00), new Date(2017, 3, 5, 23, 00, 00)]
        }
    };

    var chart0 = new google.visualization.Gauge(document.getElementById('chart_div0'));
    var chart1 = new google.visualization.Gauge(document.getElementById('chart_div1'));
    var chart2 = new google.visualization.Gauge(document.getElementById('chart_div2'));
    var chart3 = new google.visualization.LineChart(document.getElementById('line_div'));

    chart0.draw(data0, options0);
    chart1.draw(data1, options1);
    chart2.draw(data2, options2);
    chart3.draw(data3, options3);

    listen();

    //function that listens to Socket and do something when notification comes
    function listen() {
        var source = new WebSocket('ws://' + window.location.host + '/ws');
        source.onmessage = function (msg) {
            var message = JSON.parse(msg.data);
            console.log(message);

            var text = 'Humidity is: ' + message["new_val"]["humd"];
            //var myDate = new Date(message["new_val"]["date"]);
            var parts = message["new_val"]["date"].split('-');

            var timePart = parts[2].substring(3,11).split(':');

            var myDate = new Date(parts[0], parts[1] - 1, parts[2].substring(0,2), timePart[0], timePart[1], timePart[2   ]);

            data0.setValue(0, 1, message["new_val"]["humd"]);
            data1.setValue(0, 1, message["new_val"]["pres"]);
            data2.setValue(0, 1, message["new_val"]["temp"]);

            data3.addRow([myDate, message["new_val"]["temp"]]);

            chart0.draw(data0, options0);
            chart1.draw(data1, options1);
            chart2.draw(data2, options2);
            chart3.draw(data3, options3);
        }
    }
}