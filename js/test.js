var name;
var n_elements;
var m_elements;
var m_elements_max;
var elements;
var pdf;
var numerical;
var epsilon = 0.0001;

var n_samples = 0;
var counter = 0;
var speed = 0.5;


function pickRandomElements() {
    n_samples = parseInt($('#n_iterations').val());
    counter = 0;
    window.setTimeout(do_something, 200);
}

function do_something() {
    var result_txt_div = $('#result_text');
    var iteration_count = $('#iteration_count');
    speed = parseFloat($('#speed').val());

    var result_txt = '';
    elements.forEach(function (value) {
        result_txt += value[Math.floor(Math.random()*value.length)] + ' ';
    });
    result_txt_div.html('<b>Resultat:</b><br>' + result_txt);
    counter++;
    if (counter < n_samples) {
        window.setTimeout(do_something, speed * 1000);
    }
    iteration_count.html(counter + ' iteration');
}



function loadFile() {
    var input, file, fr;

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
    else if (input.files[0]['name'].split('.').pop() !== 'json') {
        alert("Please load a json file.");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        lines = e.target.result;
        var input_json = JSON.parse(lines);

        elements = input_json['udfaldsrum'];
        n_elements = input_json['udfaldsrum'].length;
        m_elements = [];
        input_json['udfaldsrum'].forEach(function (value) {
            m_elements.push(value.length);
        });
        m_elements_max = Math.max(m_elements);

        var current_file = $('#current-file');
        var input_elements = $('#input-elements');

        current_file.text(name);

        var input_elements_text = '';
        input_elements_text += '<table class="table"><thead><tr>';
        for (var i = 0; i < m_elements.length; i++) {
            input_elements_text += '<th scope="col">Element</th>';
        }
        input_elements_text +=    '</tr></thead>';
        input_json['udfaldsrum'].forEach(function (value) {
            console.log(value);
            input_elements_text += '<tr>';
            for (var i = 0; i < m_elements.length; i++) {
                input_elements_text += '<td>' + value[i] + '</td>';
            }
            input_elements_text += '<tr>';
        });
        input_elements_text += '</table>';
        console.log(input_elements_text);
        input_elements.html(input_elements_text);

    }
}

