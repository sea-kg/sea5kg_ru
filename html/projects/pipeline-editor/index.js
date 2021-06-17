var canvas = document.getElementById("pipeline_diagram_canvas");
var ctx = canvas.getContext("2d");
init_canvas(ctx)

var max_cell_x = -1;
var max_cell_y = -1;

function update_image_size() {
    var new_max_cell_x = 0;
    var new_max_cell_y = 0;
    for (var i in data_pl) {
        data_pl[i]['hidden_highlight'] = false;
        new_max_cell_x = Math.max(data_pl[i].cell_x, new_max_cell_x);
        new_max_cell_y = Math.max(data_pl[i].cell_y, new_max_cell_y);
    }

    if (new_max_cell_x != max_cell_x || new_max_cell_y != max_cell_y) {
        max_cell_y = new_max_cell_y;
        max_cell_x = new_max_cell_x;

        pl_width = (max_cell_x + 1) * pl_cell_width + 2 * pl_padding + 100;
        pl_height = (max_cell_y + 1) * pl_cell_height + 2 * pl_padding + 100;
        canvas.width  = pl_width;
        canvas.height = pl_height;
        canvas.style.width  = pl_width + 'px';
        canvas.style.height = pl_height + 'px';
    }
    /*console.log("max_cell_x = ", max_cell_x);
    console.log("pl_width = ", pl_width);
    console.log("max_cell_y = ", max_cell_y);
    console.log("pl_height = ", pl_height);*/
}


for (var i in data_pl) {
    data_pl[i]['hidden_highlight'] = false;
}

function calcX_in_px(cell_x) {
    return pl_padding + cell_x * pl_cell_width;
}

function calcY_in_px(cell_y) {
    return pl_padding + cell_y * pl_cell_height;
}

function update_pipeline_diagram() {
    update_image_size();
    // console.log("update_pipeline_diagram");

    init_canvas(ctx)

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, pl_width, pl_height);
    ctx.strokeRect(0, 0, pl_width, pl_height);
    ctx.strokeStyle = "#E9F0E0";

    for (var x = pl_padding; x <= pl_width; x = x + pl_cell_width) {
        var x1 = x - (pl_cell_width - pl_card_width) / 2;
        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1, pl_height);
        ctx.stroke();
    }

    for (var y = pl_padding; y <= pl_height; y = y + pl_cell_height) {
        var y1 = y - (pl_cell_height - pl_card_height) / 2;
        ctx.beginPath();
        ctx.moveTo(0, y1);
        ctx.lineTo(pl_width, y1);
        ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    // ctx.fillRect(10, 10, 100, 100);
    ctx.lineWidth = 1;

    // cards
    for (var i in data_pl) {
        var p = data_pl[i];
        // console.log(p);
        var x1 = pl_padding + p.cell_x * pl_cell_width;
        var y1 = pl_padding + p.cell_y * pl_cell_height;
        data_pl[i].x1 = x1;
        data_pl[i].y1 = y1;

        // fill          
        ctx.fillStyle = selectedCard == i ? "#E6ECDF" : "white";
        ctx.fillRect(x1, y1, pl_card_width, pl_card_height);
        ctx.fillStyle = "black";

        ctx.strokeRect(x1, y1, pl_card_width, pl_card_height);
        var d = 20;
        x1_name = (pl_card_width - p['hidden_name_width']) / 2;
        ctx.fillText('' + p['name'], x1 + x1_name, y1 + d);
        d += 20;
        x1_description = (pl_card_width - p['hidden_description_width']) / 2;
        ctx.fillText('' + p['description'], x1 + x1_description, y1 + d);
    }

    // parents
    ctx.lineWidth = 1;
    for (var i in data_pl) {
        var p = data_pl[i];
        
        if (p.mother > 0 && p.father > 0) {
        var mo = data_pl[p.mother];
        var fa = data_pl[p.father];
        
        var mo_x1 = calcX_in_px(mo.cell_x);
        var mo_y1 = calcY_in_px(mo.cell_y);

        var fa_x1 = calcX_in_px(fa.cell_x);
        var fa_y1 = calcY_in_px(fa.cell_y);

        var x1 = calcX_in_px(p.cell_x);
        var y1 = calcY_in_px(p.cell_y);

        mo_x1 += pl_card_width / 2;
        mo_y1 += pl_card_height;
        fa_x1 += pl_card_width / 2;
        fa_y1 += pl_card_height;
        x1 += pl_card_width / 2;

        var x2 = (mo_x1 + fa_x1) / 2;
        // var y2 = Math.max(fa_y1, mo_y1) + pl_card_width / 3;
        var y2 = Math.max(fa_y1, mo_y1) + 30;
        var y3 = y2 + 20;

        ctx.beginPath();
        ctx.arc(mo_x1, mo_y1, 6, 0, Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(fa_x1, fa_y1, 6, 0, Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(mo_x1, mo_y1);
        ctx.lineTo(mo_x1, y2);
        ctx.lineTo(fa_x1, y2);
        ctx.lineTo(fa_x1, fa_y1);
        ctx.stroke();
        
        ctx.fillRect(x2-3, y2-3, 6, 6);
        ctx.fillRect(x2-3, y3-3, 6, 6);

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2, y3);
        ctx.lineTo(x1, y3);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        // arrow
        ctx.beginPath();
        ctx.moveTo(x1-6, y1-12);
        ctx.lineTo(x1+6, y1-12);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x1-6, y1-12);
        ctx.fill();
        
        }
    }
}

var selectedCard = -1;
var movingEnable = false;
var scrollMoving = false;
var scrollMovingPos = {};

canvas.onmouseover = function(event) {
    // var target = event.target;
    movingEnable = false;
    scrollMoving = false;
};

canvas.onmouseout = function(event) {
    // var target = event.target;
    movingEnable = false;
    scrollMoving = false;
};

canvas.onmouseup = function(event) {
    // var target = event.target;
    if (event.button == 1) { // scroll button
        scrollMoving = false;
        return;
    }
    if (movingEnable) {
        movingEnable = false;
    }
}

canvas.onmousedown = function(event) {
    // var target = event.target;
    if (event.button == 1) { // scroll button
        scrollMoving = true;
        scrollMovingPos = {
            left: tab_content_ui_editor.scrollLeft,
            top: tab_content_ui_editor.scrollTop,
            x: event.clientX,
            y: event.clientY,
        };
        return;
    }

    if (selectedCard >= 0) {
        // console.log(target);
        movingEnable = true;
    }
};

canvas.onmousemove = function(event) {
    var target = event.target;
    // console.log(event);
    var co = target.getBoundingClientRect();
    // console.log(co);
    var x0 = event.clientX - co.left;
    var y0 = event.clientY - co.top;

    if (scrollMoving) {
        const dx = event.clientX - scrollMovingPos.x;
        const dy = event.clientY - scrollMovingPos.y;

        // Scroll the element
        tab_content_ui_editor.scrollTop = scrollMovingPos.top - dy;
        tab_content_ui_editor.scrollLeft = scrollMovingPos.left - dx;
    }

    if (movingEnable && selectedCard >= 0) {
        var t_x = Math.floor((x0 - pl_padding) / pl_cell_width);
        var t_y = Math.floor((y0 - pl_padding) / pl_cell_height);

        // console.log(y0);
        if (data_pl[selectedCard].cell_x != t_x || data_pl[selectedCard].cell_y != t_y) {
            data_pl[selectedCard].cell_x = t_x;
            data_pl[selectedCard].cell_y = t_y;
            update_pipeline_diagram();
        }
        return;
    }
    
    var changesExists = false;
    selectedCard = -1;
    for (var i in data_pl) {
        var x1 = data_pl[i].x1;
        var x2 = x1 + pl_card_width;
        var y1 = data_pl[i].y1;
        var y2 = y1 + pl_card_height;
        var res = false;

        if (x0 > x1 && x0 < x2 && y0 > y1 && y0 < y2) {
            res = true;
            target.style.cursor = 'pointer';
            selectedCard = i;
        }

        if (data_pl[i]['hidden_highlight'] != res) {
            changesExists = true;
            data_pl[i]['hidden_highlight'] = res;
        }
    }
    if (selectedCard < 0) {
        target.style.cursor = 'default';
    }
    if (changesExists) {
        update_pipeline_diagram();
    }
};



function switch_to_ui_editor() {
    document.getElementById("tab_content_ui_editor").style.display = "block";
    document.getElementById("tab_content_json").style.display = "none";

    document.getElementById("tab_ui_editor").classList.add("active");
    document.getElementById("tab_json").classList.remove("active");

    data_pl = JSON.parse(json_content.value);
    update_meansures();
    update_pipeline_diagram();
}

function switch_to_json() {
    document.getElementById("tab_content_ui_editor").style.display = "none";
    document.getElementById("tab_content_json").style.display = "block";
    
    document.getElementById("tab_ui_editor").classList.remove("active");
    document.getElementById("tab_json").classList.add("active");
    var _data_pl = Object.assign({}, data_pl);
    for (i in _data_pl) {
        for (n in _data_pl[i]) {
            if (n.startsWith("hidden_")) {
                _data_pl[i][n] = undefined;        
            }
        }
        // todo redesign
        _data_pl[i]['x1'] = undefined;
        _data_pl[i]['y1'] = undefined;
    }
    json_content.value = JSON.stringify(_data_pl, undefined, 4);
}

function save_as_image() {
    const dataUrl = pipeline_diagram_canvas.toDataURL("png");
    var win = window.open();
    win.document.write('<iframe src="' + dataUrl  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen> </iframe>');
}

document.addEventListener("DOMContentLoaded", function() {
    update_meansures();
    update_pipeline_diagram();
});


