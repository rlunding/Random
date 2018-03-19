var name;
var n_elements;
var elements;
var pdf;
var numerical;
var epsilon = 0.0001;

function pickRandomElement() {

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
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        lines = e.target.result;
        var input_json = JSON.parse(lines);

        if (!input_json.hasOwnProperty('navn')) {
            alert('Du skal lige finde på et navn');
            return;
        }
        if (!input_json.hasOwnProperty('udfaldsrum')) {
            alert('Du skal definere et udfaldsrum');
            return;
        }
        if (!input_json.hasOwnProperty('fordeling')) {
            alert('Du skal definere en fordeling');
            return;
        }
        if (!isArray(input_json['udfaldsrum'])) {
            alert('Udfaldsrummet skal være en liste');
            return;
        }
        if (!(input_json['fordeling'] === 'uniform') && !isArray(input_json['fordeling'])) {
            alert('Fordelingen skal være \'uniform\' eller en liste.');
            return;
        }

        n_elements = input_json['udfaldsrum'].length;

        if (input_json['fordeling'] === 'uniform') {
            pdf = Array(n_elements).fill(1/n_elements);
        } else {
            var pdf_numerical_check = true;
            input_json['fordeling'].forEach(function (value) {
                if (!$.isNumeric(value)){
                    console.log(value);
                    pdf_numerical_check = false;
                }
            });
            if (!pdf_numerical_check) {
                alert('Fordelingen skal uniform eller en liste af tal.');
                return;
            }

            var pdf_sum = 0;
            input_json['fordeling'].forEach(function (value) {
                pdf_sum += value;
            });
            if ((pdf_sum - 1) > epsilon) {
                console.log(pdf_sum);
                alert('Fordelingen skal summe til 1.');
                return;
            }
            pdf = input_json['fordeling'];
        }


        name = input_json['navn'];
        elements = input_json['udfaldsrum'];

        var current_file = $('#current-file');
        var input_elements = $('#input-elements');

        current_file.text(name);

        var input_elements_text = '';
        input_elements_text += '<table class="table"><thead><tr>' +
            '<th scope="col">Element</th>' +
            '<th scope="col">Sandsynlighed</th>' +
            '</tr></thead>';
        for (var i = 0; i < n_elements; i++) {
            input_elements_text += '<tr>' +
                '<td>' + elements[i] + '</td>' +
                '<td>'+ pdf[i] +'</td>' +
                '<tr>';
        }
        input_elements_text += '</table>';
        console.log(input_elements_text);
        input_elements.html(input_elements_text);

    }
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

