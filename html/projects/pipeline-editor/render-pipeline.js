
var fontSize = 16;
var pl_cell_width = 170;
var pl_cell_height = 86;
var pl_card_width = 159;
var pl_card_height = 62;
var pl_height = 100;
var pl_width = 100;
var pl_padding = 20;

function init_canvas(ctx) {
    ctx.font = fontSize + "px Arial";
}

var textHeight = fontSize * 1.5;

function update_meansures() {
    var max_width = 0;
    var pl_cell_max_x = 0;
    var pl_cell_max_y = 0;
    for (var i in data_pl) {
        var tMeas = ctx.measureText(data_pl[i]['name']);
        max_width = Math.max(tMeas.width, max_width);
        data_pl[i]['hidden_name_width'] = parseInt(tMeas.width);
        tMeas = ctx.measureText(data_pl[i]['description']);
        max_width = Math.max(tMeas.width, max_width);
        data_pl[i]['hidden_description_width'] = parseInt(tMeas.width);
        pl_cell_max_x = Math.max(data_pl['cell_x'])
        pl_cell_max_y = Math.max(data_pl['cell_y'])
    }
    pl_card_width = parseInt(max_width) + 20;
    pl_cell_width = pl_card_width + 20;
    
    // pl_height = pl_cell_max_y * pl_cell_height;
    // pl_width = pl_cell_max_x * pl_cell_width;
}