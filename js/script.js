

var box             = "square";
var jump            = 20;
var size_block      = 20; // in px
var position_start  = [48,28]; // left, top

var map    = "";
map    += "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSN";
map    += "SEEEWWEGGGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEGEESN";
map    += "SEEEWWWWWWWEEEEEEEEEEEEEEEEEEEEEWWWWWWWWWWSN";
map    += "SEEEEEEEEEWWWWWWWWWWWEEEEWWWWGGGGGGGGGEGEESN";
map    += "SEEEEEEEEEEEEEEEEEESSEEEEEEEEWWWWWWWEEEGEESN";
map    += "SEEEEEEEEEEEEEEEEEESSEEEEEEEEGGGGGGGGGEGEESN";
map    += "SEEEEEEEEEEEEEEEEEEEEEEEEEEEEGGGGGGGGGEGEESN";
map    += "SEEEEEEEEEEEEEEEEEEEEEEEEEEEEGGGGGGGGGEGEESN";
map    += "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";
var gen_map     = [];

var block = {
    over : function (top,left) {

        for (i = 0; i < gen_map.length; i++) {
            if (gen_map[i][0] == left && gen_map[i][1] == top) {
                var id      = gen_map[i][2] + "_" + i;
                var type    = gen_map[i][2];
                return this.onIn(id, type);
            }
        }
        return false;
    },
    onIn : function (id, type) {
        if (type == "empty") {
            return false;
        }        
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

    var map_parts   = map.split("N");
    var x1          = 8;
    var y1          = 8;

    for (i=0; i < map_parts.length; i++) {
        x1 = 8;
        var row = map_parts[i].split('');

        for (j=0; j < row.length; j++) {
            var field   = row[j];
                x1      += 20;
            var type    = "";
            if (field == "S") {
                type = "stone";
            }
            if (field == "W") {
                type = "water";
            }
            if (field == "E") {
                type = "empty";
            }
            if (field == "G") {
                type = "gold";
            }
            gen_map    = gen_map.concat([ [x1, y1, type] ]);
        }
        y1 += 20;
    }
console.log(gen_map)
    for (i = 0; i < gen_map.length; i++) {
        var id          = gen_map[i][2] + "_" + i;
        var box_block   = "<div class=\" block " + gen_map[i][2] + "\" id=\"" + id + "\"></div>";
        var b           = $(box_block).css({top : gen_map[i][1], left : gen_map[i][0]});
        $('#area').append( b.prop("outerHTML") );
    }
}
generateMap(map);