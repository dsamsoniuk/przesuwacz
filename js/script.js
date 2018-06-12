

var box             = "square";
var jump            = 20;
var size_block      = 20; // in px
var position_start  = [28,28]; // left, top

var map = [
    [8,8, "stone"],[28,8, "stone"],[48,8, "stone"],[68,8, "stone"],[88,8, "stone"],[108,8, "stone"],[128,8, "stone"],[148,8, "stone"],[168,8, "stone"],
    [8,28, "stone"], [168,28, "stone"],
    [8,48, "stone"],[168,48, "stone"],
    [8,68, "stone"],[168,68, "stone"],
    [8,88, "stone"],[28,88, "stone"],[48,88, "stone"],[68,88, "stone"],[88,88, "stone"],[108,88, "stone"],[128,88, "stone"],[148,88, "stone"],[168,88, "stone"],
];

map = map.concat([
    [48,28, "water"],[68,28, "water"],
    [128,48, "water"],
]);

map = map.concat([
    [88,28, "gold"],[108,28, "gold"],
    [148,68, "gold"],[148,48, "gold"],
]);

var block = {
    over : function (top,left) {

        for (i = 0; i < map.length; i++) {
            if (map[i][0] == left && map[i][1] == top) {
                var id      = map[i][2] + "_" + i;
                var type    = map[i][2];
                return this.onIn(id, type);
            }
        }
        return false;
    },
    onIn : function (id, type) {
        if (type == "stone") {
            var result = this.source.stone(id);
            this.setInfo(result.info);
            return result.res;
        }       
        if (type == "water") {
            var result = this.source.water(id);
            this.setInfo(result.info);
            return result.res;
        }
        if (type == "gold") {
            var result = this.source.gold(id);
            this.setInfo(result.info);
            this.setScore(result.score);
            return result.res;
        }
        return true;
    },
    source : {
        stone : function(id) {
            return { "info" : "Troche za wysoko nie da się wspiąć na ten głaz", "res" : true };
        },
        water : function(id) {
            return { "info" : "Zimna woda, nie możesz wejść", "res" : true };
        },
        gold : function(id) {
            $("#" + id).remove();
            return { "info" : "Znalazłeś monetę! Brawo!", "res" : false, "score" : 1 };
        },
    },
    setInfo  : function(txt){
        $("#info").html("Info : " + txt);
    },
    setScore : function (num) {
        var currentScore = parseInt($("#score").html());
        $("#score").html(currentScore + num);
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
    var box = '<div id="square" style="left:'+position_start[0]+'px; top:'+position_start[1]+'px;"></div>';
 
    $('body').append(box);

    for (i = 0; i < map.length; i++) {
        var id          = map[i][2] + "_" + i;
        var box_block   = "<div class=\" block " + map[i][2] + "\" id=\"" + id + "\"></div>";
        var b           = $(box_block).css({top : map[i][1], left : map[i][0]});
        $('#area').append( b.prop("outerHTML") );
    }
}
generateMap(map);