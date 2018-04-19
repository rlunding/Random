
function lavSkrabelod() {
    var antal = 0;
    var elements = [
        "elem1", "elem2", "elem3",
        "elem4", "elem5", "elem6",
        "elem7", "elem8", "elem9"
    ];

    for (var i = 0; i < elements.length; i++) {
        var img = document.getElementById(elements[i]);
        if (Math.random() < 0.5) {
            img.src =  "img/smiley.jpg";
            antal = antal + 1;
        } else {
            img.src =  "img/white.jpg";
        }
    }
    document.getElementById("antal").innerHTML =  "Antal "+antal;
}

$( document ).ready(function() {
    lavSkrabelod();
});