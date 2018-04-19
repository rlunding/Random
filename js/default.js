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
    //result_txt_div.html('Valgt: ' + picked_txt + "<br>" +'<b>Resultat:</b><br>' + result_txt);
    result_txt_div.html(result_txt);

    var statistic_txt = '<table class="table"<tr>'
        + '<th colspan="'+(m_elements_max+1)+'"><span class="vertical-center">Antal gange en given linje er valgt</span></th>'
        + '</tr>';
    for (i = 0; i < stats_picked_elements.length; i++) {
        statistic_txt += '<tr><td>Line '+ (i+1) +'</td>';
        for (var j = 0; j < stats_picked_elements[i].length; j++) {
            statistic_txt += '<td>' + stats_picked_elements[i][j] + '</td>';
        }
        for (j = 0; j < m_elements_max - stats_picked_elements[i].length; j++) {
            statistic_txt += '<td>-</td>';
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
    iteration_count.html('Historie: ' + counter);
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

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

function loadFile() {
    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        lines = e.target.result;

        try {
            var input_json = JSON.parse(lines);
        } catch (e) {
            alert('Det er ikke korrekt JSON!');
            return;
        }

        if (!input_json.hasOwnProperty('udfaldsrum')) {
            alert('Du skal definere et udfaldsrum');
            return;
        }
        if (!isArray(input_json['udfaldsrum'])) {
            alert('Udfaldsrummet skal være en liste');
            return;
        }
        for (var i = 0; i < input_json['udfaldsrum'].length; i++) {
            if (!isArray(input_json['udfaldsrum'][i])) {
                alert('Hver mulighed i udfaldsrummet skal være en liste');
                return;
            }
        }
        alert('Super duper!');
        parseJson(input_json);
    }
}

function parseJson(input_json) {
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
}


$( document ).ready(function() {
    $.getJSON("bog.json", function () {
        console.log("Success");
    }).done(function (data) {
        parseJson(data);
    });
});