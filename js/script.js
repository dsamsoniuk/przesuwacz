

var box         = "square";
var jump        = 20;
var size_block  = 20; // in px


var map = [
    [48,8],
    [8,68],
    [8,48]
];

var block = {
    over : function (top,left) {

        for (i = 0; i < map.length; i++) {
            if (map[i][0] == left && map[i][1] == top) {
                return true;
            }
        }
        return false;
    }
}

function placeBox(top,left) {

    var element = document.getElementById(box);
    var rect    = element.getBoundingClientRect();

    var x       = rect.left + (left * jump);
    var y       = rect.top + (top * jump);

    // console.log(rect.top, rect.right, rect.bottom, rect.left);
    // console.log({top : y, left:x})
    if (block.over(y,x)) {
        return;
    }
    if (left) {
        element.style.left = x + 'px';
    }
    if (top) {
        element.style.top  = y + 'px';
    }
}

$( "body" ).on( "keydown", function( event ) {
    // console.log(event.type + ": " +  event.which );
    if (event.which == 37) { //lewa strzalka
        placeBox(0,-1);
    }
    else if (event.which == 39) { // prawa strzalka
        placeBox(0,1);
    }
    else if (event.which == 40) { // strzalka w dol
        placeBox(1,0);
    }
    else if (event.which == 38) { // strzalka w gore
        placeBox(-1,0);
    }
});



function generateMap(map) {

    var i;
    var block_stone = "<div class=\"stone\"></div>";
    // var d           = document.getElementById("area");

    for (i = 0; i < map.length; i++) {
        var b = $(block_stone).css({top : map[i][1], left : map[i][0]});

        $('#area').append(b.prop("outerHTML"));
    }

}
generateMap(map)