var n_elements;
var m_elements;
var m_elements_max;
var elements;

var n_samples = 0;
var counter = 0;
var speed = 0.5;
var timer;
var running;
var stats_picked_elements;

function pickRandomElements() {
    if (!running) {
        running = true;
        disableStartButton(running);
        resetStatsArray();
        n_samples = parseInt($('#n_iterations').val());
        counter = 0;
        window.setTimeout(do_something, 200);
    }
}

function do_something() {
    var result_txt_div = $('#result_text');
    var statistic_txt_div = $('#statistic_text');
    var iteration_count = $('#iteration_count');
    speed = parseFloat($('#speed').val());

    var result_txt = '';
    var picked_txt = '[';
    for (var i = 0; i < n_elements; i++) {
        var picked_rnd_value = Math.floor(Math.random()*elements[i].length);
        result_txt += elements[i][picked_rnd_value] + '<br> ';
        picked_txt += picked_rnd_value + ', ';
        stats_picked_elements[i][picked_rnd_value] += 1;
    }
    picked_txt = picked_txt.substring(0, picked_txt.length-2) + ']';
    result_txt_div.html('Valgt: ' + picked_txt + "<br>" +'<b>Resultat:</b><br>' + result_txt);

    var statistic_txt = '<table class="table"><tr>' +
        '<th rowspan="'+n_elements+1+'"><span class="vertical-center">Valg</span></th>' +
        '<th colspan="'+m_elements_max+'">Mulighed</th>' +
        '</tr>';
    for (var i = 0; i < stats_picked_elements.length; i++) {
        statistic_txt += '<tr>';
        for (var j = 0; j < stats_picked_elements[i].length; j++) {
            statistic_txt += '<td>' + stats_picked_elements[i][j] + '</td>';
        }
        statistic_txt += '<tr>';
    }
    statistic_txt_div.html(statistic_txt + '</table>');


    counter++;
    if (counter < n_samples) {
        timer = window.setTimeout(do_something, speed * 1000);
    } else {
        running = false;
        disableStartButton(running);
    }
    iteration_count.html('Iteration: ' + counter);
}

function stopPickingRandomElements() {
    clearTimeout(timer);
    running = false;
    disableStartButton(running);
}

function disableStartButton(val) {
    $('#btnStartRandomStuff').prop("disabled", val);
    $('#btnStopRandomStuff').prop("disabled", !val);
}

function resetStatsArray() {
    stats_picked_elements = [];
    for (var i = 0; i < n_elements; i++) {
        stats_picked_elements[i] = [];
        for (var j = 0; j < m_elements[i]; j++) {
            stats_picked_elements[i][j] = 0;
        }
    }
}


$( document ).ready(function() {
    var history_json = $.getJSON("bog.json", function () {
        console.log("Success");
    }).done(function (data) {
        var input_json = data;

        elements = input_json['udfaldsrum'];
        n_elements = input_json['udfaldsrum'].length;
        m_elements = [];

        input_json['udfaldsrum'].forEach(function (value) {
            m_elements.push(value.length);
        });
        m_elements_max = m_elements.reduce(function(a, b) {
            return Math.max(a, b);
        });

        var input_elements = $('#input-elements');
        var input_elements_text = '<p>';
        for (var i = 0; i < n_elements; i++) {
            input_elements_text += 'Valg ' + (i + 1) + ': ' + m_elements[i] + ' muligheder<br>';
        }
        input_elements_text += '</br>';
        console.log(input_elements_text);
        input_elements.html(input_elements_text);

        resetStatsArray();

        running = false;
        disableStartButton(running);
    });
    
});