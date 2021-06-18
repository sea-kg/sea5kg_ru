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
        data_pl[i].hidden_x1 = x1;
        data_pl[i].hidden_y1 = y1;

        // fill          
        ctx.fillStyle = pl_highlightCard == i ? "#E6ECDF" : "white";
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

        if (p.incoming) {
            

            var main_x1 = calcX_in_px(p.cell_x) + pl_card_width / 2;
            var main_y1 = calcY_in_px(p.cell_y);

            var max_y = 0;
            var min_x = 0;
            var max_x = 0;
            var has_income = false;
            for (var inc in p.incoming) {
                var node = data_pl[inc];
                if (!node) {
                    continue;
                }
                var inc_x1 = calcX_in_px(node.cell_x) + pl_card_width / 2;
                var inc_y1 = calcY_in_px(node.cell_y) + pl_card_height;

                if (!has_income) {
                    has_income = true;
                    max_y = inc_y1;
                    min_x = inc_x1;
                    max_x = inc_x1;
                } else {
                    max_y = Math.max(inc_y1, max_y);
                    min_x = Math.min(inc_x1, min_x);
                    max_x = Math.max(inc_x1, max_x);
                }
            }

            min_x = Math.min(main_x1, min_x);
            max_x = Math.max(main_x1, max_x);

            max_y += pl_cell_height / 2 + (pl_cell_height - pl_card_height) / 2;

            for (var inc in p.incoming) {
                var node = data_pl[inc];
                if (!node) {
                    continue;
                }
                var inc_x1 = calcX_in_px(node.cell_x) + pl_card_width / 2;
                var inc_y1 = calcY_in_px(node.cell_y) + pl_card_height;

                // out circle
                ctx.beginPath();
                ctx.arc(inc_x1, inc_y1, 6, 0, Math.PI);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(inc_x1, inc_y1);
                ctx.lineTo(inc_x1, max_y);
                ctx.stroke();

                ctx.fillRect(inc_x1 - 3, max_y - 3, 6, 6);
            }
            
            if (has_income) {
                // horizontal line
                ctx.beginPath();
                ctx.moveTo(min_x, max_y);
                ctx.lineTo(max_x, max_y);
                ctx.stroke();

                // to
                ctx.beginPath();
                ctx.moveTo(main_x1, max_y);
                ctx.lineTo(main_x1, main_y1);
                ctx.stroke();

                // arrow
                ctx.beginPath();
                ctx.moveTo(main_x1 - 6, main_y1 - 12);
                ctx.lineTo(main_x1 + 6, main_y1 - 12);
                ctx.lineTo(main_x1, main_y1);
                ctx.lineTo(main_x1 - 6, main_y1 - 12);
                ctx.fill();
            }
        }
    }
}

var movingEnable = false;
var scrollMoving = false;
var scrollMovingPos = {};

canvas.onmouseover = function(event) {
    // var target = event.target;
    movingEnable = false;
    scrollMoving = false;
    update_pipeline_diagram()
};

canvas.onmouseout = function(event) {
    // var target = event.target;
    movingEnable = false;
    scrollMoving = false;
    update_pipeline_diagram()
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
            left: canvas_container.scrollLeft,
            top: canvas_container.scrollTop,
            x: event.clientX,
            y: event.clientY,
        };
        return;
    }

    if (pl_highlightCard != null) {
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
        canvas_container.scrollTop = scrollMovingPos.top - dy;
        canvas_container.scrollLeft = scrollMovingPos.left - dx;
        return;
    }

    if (movingEnable && pl_highlightCard != null) {
        var t_x = Math.floor((x0 - pl_padding) / pl_cell_width);
        var t_y = Math.floor((y0 - pl_padding) / pl_cell_height);

        // console.log(y0);
        if (data_pl[pl_highlightCard].cell_x != t_x || data_pl[pl_highlightCard].cell_y != t_y) {
            data_pl[pl_highlightCard].cell_x = t_x;
            data_pl[pl_highlightCard].cell_y = t_y;
            update_pipeline_diagram();
        }
        return;
    }
    
    var changesExists = false;
    pl_highlightCard = null;
    for (var i in data_pl) {
        var x1 = data_pl[i].hidden_x1;
        var x2 = x1 + pl_card_width;
        var y1 = data_pl[i].hidden_y1;
        var y2 = y1 + pl_card_height;
        var res = false;

        if (x0 > x1 && x0 < x2 && y0 > y1 && y0 < y2) {
            res = true;
            target.style.cursor = 'pointer';
            pl_highlightCard = i;
        }

        if (data_pl[i]['hidden_highlight'] != res) {
            changesExists = true;
            data_pl[i]['hidden_highlight'] = res;
        }
    }
    if (pl_highlightCard == null) {
        target.style.cursor = 'default';
    }
    if (changesExists) {
        update_pipeline_diagram();
    }
};

function export_to_json() {
    var _data_pl = {};
    for (i in data_pl) {
        _data_pl[i] = {}
        for (n in data_pl[i]) {
            if (n.startsWith("hidden_")) {
                _data_pl[i][n] = undefined;        
            } else {
                _data_pl[i][n] = data_pl[i][n];
            }
        }
    }
    return _data_pl;
}

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
    var _data_pl = export_to_json();
    json_content.value = JSON.stringify(_data_pl, undefined, 4);
}

function save_as_image() {
    const dataUrl = pipeline_diagram_canvas.toDataURL("png");
    var win = window.open();
    win.document.write('<iframe src="' + dataUrl  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen> </iframe>');
}

function save_to_localstorage() {
    var _data_pl = export_to_json();
    _data_pl = JSON.stringify(_data_pl, undefined, 4);
    localStorage.setItem('data_pl', _data_pl);
}

function random_makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function add_block() {
    var added = false;
    while (!added) {
        var new_id = random_makeid(7)
        if (!data_pl[new_id]) {
            data_pl[new_id] = {
                "name": "edit me",
                "description": "edit me",
                "incoming": {},
                "cell_x": 0,
                "cell_y": 0
            }
            added = true;
        }
    }
    update_meansures();
    update_pipeline_diagram();
}

function scale_plus() {
    pl_scale += 0.1;
    var tr_x = parseInt((pl_width*pl_scale - pl_width)/2);
    var tr_y = parseInt((pl_height*pl_scale - pl_height)/2);
    pipeline_diagram_canvas.style.transform = "scale(" + pl_scale + ") translate(" + tr_x + "px, " + tr_y + "px)"
}

function scale_reset() {
    pl_scale = 1.0
    pipeline_diagram_canvas.style.transform = "scale(" + pl_scale + ")";
}

function scale_minus() {
    pl_scale -= 0.1;
    var tr_x = parseInt((pl_width*pl_scale - pl_width)/2);
    var tr_y = parseInt((pl_height*pl_scale - pl_height)/2);
    pipeline_diagram_canvas.style.transform = "scale(" + pl_scale + ") translate(" + tr_x + "px, " + tr_y + "px)";
}

document.addEventListener("DOMContentLoaded", function() {
    var _data_pl = localStorage.getItem('data_pl')
    if (_data_pl) {
        data_pl = JSON.parse(_data_pl);
    }

    update_meansures();
    update_pipeline_diagram();
});
