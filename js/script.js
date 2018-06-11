

var box     = "square";
var jump    = 10;

function placeBox(top,left) {

    var element = document.getElementById(box);
    var rect    = element.getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);
    if (top) {
        element.style.top  = rect.top + (top*jump) + 'px';
    }
    if (left) {
        element.style.left = rect.left + (left*jump) + 'px';
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
    else if (event.which == 40) { // prawa w dol
        placeBox(1,0);
    }
    else if (event.which == 38) { // prawa w gore
        placeBox(-1,0);
    }

});