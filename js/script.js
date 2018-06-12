

var box         = "square";
var jump        = 20;
var size_block  = 20; // in px


var map = [
    [48,8, "stone"],[68,8, "water"],
    [8,68, "stone"],[108,8, "gold"],
    [8,48, "stone"]
];

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
            return { "info" : "Jestes w złocie", "res" : false, "score" : 1 };
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
    for (i = 0; i < map.length; i++) {
        var id          = map[i][2] + "_" + i;
        var box_block   = "<div class=\" block " + map[i][2] + "\" id=\"" + id + "\"></div>";
        var b           = $(box_block).css({top : map[i][1], left : map[i][0]});
        $('#area').append( b.prop("outerHTML") );
    }
}
generateMap(map);