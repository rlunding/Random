
function bygmur() {
    var result_wall_div = $('#result_wall');
    var result_txt = '';

    var prop_brick_1 = parseFloat($('#prop_brick_1').val());
    var prop_brick_2 = parseFloat($('#prop_brick_2').val());

    var count = [0, 0, 0];

    for (var i = 0; i < 12; i++) {
        result_txt += '<div class="row">';
        for (var j = 0; j < 12; j++) {
            result_txt += '<div class="col-1">';

            var rnd = Math.random();
            if (rnd < prop_brick_1) {
                result_txt += '<img src=img/brick1.png>';
                count[0]++;
            } else if (rnd < prop_brick_1 + prop_brick_2) {
                result_txt += '<img src=img/brick2.png>';
                count[1]++;
            } else {
                result_txt += '<img src=img/brick3.png>';
                count[2]++;
            }
            result_txt += '</div>';
        }
        result_txt += '</div>';
    }
    result_wall_div.html(result_txt);
    document.getElementById("antal").innerHTML =  'Muren er bygget af: '
        + count[0] + '<img class="small-brick" src="img/brick1.png"> '
        + count[1] + '<img class="small-brick" src="img/brick2.png"> '
        + count[2] + '<img class="small-brick" src="img/brick3.png">';
}

function onPropInput() {
    var errors = false;

    var prop_brick_1 = parseFloat($('#prop_brick_1').val());
    var prop_brick_2 = parseFloat($('#prop_brick_2').val());
    var prop_brick_3 = parseFloat($('#prop_brick_3').val());

    if (isNaN(prop_brick_1) || isNaN(prop_brick_2) || isNaN(prop_brick_3)
        || prop_brick_1 < 0 || prop_brick_2 < 0 || prop_brick_3 < 0) {
        document.getElementById("errors").innerHTML =  "Hmm, sandsynligheder er vistnok tal mellem 0 og 1?";
        errors = true;
    } else if (prop_brick_1 + prop_brick_2 + prop_brick_3 !== 1) {
        document.getElementById("errors").innerHTML =  "Hmm, sandsynligheder skal summe til en?";
        errors = true;
    } else {
        document.getElementById("errors").innerHTML = "";
    }
    $('#btnBuildWalls').prop("disabled", errors);
}


$( document ).ready(function() {
    bygmur();
});