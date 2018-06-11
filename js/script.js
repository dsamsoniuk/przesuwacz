

var box         = "square";
var jump        = 20;
var size_block  = 20; // in px


var map = [
    [48,8, "stone"],[68,8, "water"],
    [8,68, "stone"],
    [8,48, "stone"]
];

var block = {
    over : function (top,left,type) {

        for (i = 0; i < map.length; i++) {
            if (map[i][0] == left && map[i][1] == top) {
                this.onIn();
                return true;
            }
        }
        return false;
    },
    onIn : function () {

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
    for (i = 0; i < map.length; i++) {
        var box_block   = "<div class=\" block "+map[i][2]+"\"></div>";
        var b           = $(box_block).css({top : map[i][1], left : map[i][0]});
        $('#area').append( b.prop("outerHTML") );
    }
}
generateMap(map)