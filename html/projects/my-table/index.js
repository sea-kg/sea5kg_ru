
var c0 = 2.5; // coefficient
window.padding = 10;
window.all_boards = []
window.min_size_canvas = 200;

function findBoard(boardId) {
    for (var i = 0; i < window.all_boards.length; i++) {
        if (window.all_boards[i]['id'] === boardId) {
            return window.all_boards[i];
        }
    }
    return null;
}

function parseAndCalculateValueSize(ret, attrs, name) {
    var _val = attrs[name + "_cm"].value
    ret[name + "_cm_val"] = _val
    ret[name + "_cm"] = parseFloat(_val, 10);
    ret[name] = ret[name + "_cm"] * c0;
}

function parseAndCalculateValue(ret, anchorBoard, attrs, name) {
    var _val = attrs[name + "_cm"].value
    ret[name + "_cm_val"] = _val
    if (_val === parseFloat(_val, 10)) {
        ret[name + "_cm"] = parseFloat(_val, 10);
    } else {
        ret[name + "_cm"] = eval(_val);
    }
    if (anchorBoard) {
        ret[name + "_cm"] = ret[name + "_cm"] + anchorBoard[name + "_cm"]
    }
    ret[name] = ret[name + "_cm"] * c0;
}

function parseAllBoards() {
    window.all_boards = []
    var els = document.getElementById('boards').getElementsByClassName('board');
    var max_size_cm = 0.0;
    for (var i = 0; i < els.length; i++) {
        var attrs = els[i].attributes;
        var el_id = attrs["id"].value;
        var ret = {}
        ret["id"] = el_id;
        ret["selected"] = els[i].classList.contains("selected");
        ret["selectedAnchor"] = els[i].classList.contains("selected-anchor");
        ret["anchor"] = attrs["anchor"].value;
        var anchorBoard = findBoard(ret["anchor"]);
        
        parseAndCalculateValue(ret, anchorBoard, attrs, 'x');
        parseAndCalculateValue(ret, anchorBoard, attrs, 'y');
        parseAndCalculateValue(ret, anchorBoard, attrs, 'z');

        parseAndCalculateValueSize(ret, attrs, 'x_size');
        parseAndCalculateValueSize(ret, attrs, 'y_size');
        parseAndCalculateValueSize(ret, attrs, 'z_size');
        window.all_boards.push(ret)
        window[el_id] = ret
    }
    

    window.minX = 0;
    window.maxX = 0;
    window.minY = 0;
    window.maxY = 0;
    window.minZ = 0;
    window.maxZ = 0;

    for (var i = 0; i < all_boards.length; i++) {
        var board = all_boards[i];
        minX = Math.min(minX, board.x_cm)
        minX = Math.min(minX, board.x_cm + board.x_size_cm)
        maxX = Math.max(maxX, board.x_cm)
        maxX = Math.max(maxX, board.x_cm + board.x_size_cm)

        minY = Math.min(minY, board.y_cm)
        minY = Math.min(minY, board.y_cm + board.y_size_cm)
        maxY = Math.max(maxY, board.y_cm)
        maxY = Math.max(maxY, board.y_cm + board.y_size_cm)

        minZ = Math.min(minZ, board.z_cm)
        minZ = Math.min(minZ, board.z_cm + board.z_size_cm)
        maxZ = Math.max(maxZ, board.z_cm)
        maxZ = Math.max(maxZ, board.z_cm + board.z_size_cm)
    }
    console.log(minX, maxX);
    console.log(minY, maxY);
    console.log(minZ, maxZ);

    max_size_cm = Math.max(max_size_cm, maxX - minX)
    max_size_cm = Math.max(max_size_cm, maxY - minY)
    max_size_cm = Math.max(max_size_cm, maxZ - minZ)
    max_size_cm = max_size_cm + padding*2;

    window.c0 = window.min_size_canvas / max_size_cm;
    console.log("recalculate ", window.c0);
    // recalculate
    for (var i = 0; i < all_boards.length; i++) {
        var board = all_boards[i];
        all_boards[i]['x'] = board['x_cm'] * c0;
        all_boards[i]['y'] = board['y_cm'] * c0;
        all_boards[i]['z'] = board['z_cm'] * c0;
        all_boards[i]['x_size'] = board['x_size_cm'] * c0;
        all_boards[i]['y_size'] = board['y_size_cm'] * c0;
        all_boards[i]['z_size'] = board['z_size_cm'] * c0;
    }
}

function convertElementToObject(el) {
    var ret = {}
    var attrs = el.attributes;
    var el_id = attrs["id"].value;
    ret["id"] = el_id;
    ret["x"] = eval(attrs["x"].value, 10)
    ret["y"] = attrs["y"].value
    ret["z"] = attrs["z"].value
    ret["x_size"] = attrs["x_size"].value
    ret["y_size"] = attrs["y_size"].value
    ret["z_size"] = attrs["z_size"].value
    window[el_id] = ret;
    return ret;
}

function unselectBoards() {
    var els = document.getElementById('boards').getElementsByTagName('div');
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('selected')
        els[i].classList.remove('selected-anchor')
    }
    document.getElementById('edit_selected_board').style.display = "none";
    printPict()
}

function onClickBoard(el) {
    unselectBoards();
    document.getElementById(el.id).classList.add('selected');
    document.getElementById('edit_selected_board').style.display = "";

    var foundBoard = findBoard(el.id);
    var boardAnchor = findBoard(foundBoard.anchor);
    
    if (boardAnchor) {
        document.getElementById(boardAnchor.id).classList.add('selected-anchor');
    }

    printPict()

    // apply edit params
    document.getElementById('selected_x_cm').setAttribute('elem_id', el.id);
    document.getElementById('selected_x_cm').value = foundBoard['x_cm'] - (boardAnchor ? boardAnchor.x_cm : 0)
    document.getElementById('selected_y_cm').setAttribute('elem_id', el.id);
    document.getElementById('selected_y_cm').value = foundBoard['y_cm'] - (boardAnchor ? boardAnchor.y_cm : 0)
    document.getElementById('selected_z_cm').setAttribute('elem_id', el.id);
    document.getElementById('selected_z_cm').value = foundBoard['z_cm'] - (boardAnchor ? boardAnchor.z_cm : 0)

    var selected_anchor_list = '';
    if (foundBoard.anchor == 'none') {
        selected_anchor_list = "<option value='none' selected>none</option>";
    } else {
        selected_anchor_list = "<option value='none'>none</option>";
    }

    for (var i = 0; i < all_boards.length; i++) {
        var board = all_boards[i];
        if (foundBoard.anchor == board.id) {
            selected_anchor_list += "<option value='' selected>" + board.id + "</option>";
        } else {
            selected_anchor_list += "<option value=''>" + board.id + "</option>";
        }
    }
    document.getElementById('selected_anchor').innerHTML = selected_anchor_list
}

function updateValue(e) {
    console.log(e);
    var param = e.attributes['param'].value
    var elem_id = e.attributes['elem_id'].value
    document.getElementById(elem_id).setAttribute(param, e.value);

    console.log(param);
    console.log(elem_id);
    console.log(e.value);
    printPict()
}

function changeColor(ctx, board) {
    if (board["selected"]) {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "#000";
    } else if (board["selectedAnchor"]) {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "#000";
    } else {
        ctx.fillStyle = "#EEE";
        ctx.strokeStyle = "#000";
    }
}

function sortBy(name) {
    var max_count = 1000;
    var iterations = 0;
    var per = 1;
    while (per > 0) {
        per = 0;
        for (var i = 0; i < all_boards.length-1; i++) {
            if (all_boards[i][name] < all_boards[i+1][name]) {
                var t = all_boards[i];
                all_boards[i] = all_boards[i+1];
                all_boards[i+1] = t;
                per++;
            }
            iterations++;
        }
        if (iterations > 1000)  {
            console.error("Iterations too match");
            return;
        }
    }
}

function printPict() {
    var canvas = document.getElementById('pictXY');
    var ctx = canvas.getContext("2d");
    ctx.font = "14px Arial";
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";

    ctx.fillRect  (0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();

    window.min_size_canvas = Math.min(canvas.width/2, canvas.height/2);

    parseAllBoards();

    // sort by z
    sortBy('z')
    var paddingXY_x = canvas.width / 2;
    paddingXY_x = paddingXY_x / 2;
    paddingXY_x = paddingXY_x - (maxX * c0 - minX * c0) / 2;
    paddingXY_x = paddingXY_x - minX * c0;

    var paddingXY_y = canvas.height / 2;
    paddingXY_y = paddingXY_y / 2;
    paddingXY_y = paddingXY_y - (maxY * c0 - minY * c0) / 2;
    paddingXY_y = paddingXY_y - minY * c0;

    for (var i = 0; i < all_boards.length; i++) {
        var board = all_boards[i];
        changeColor(ctx, board);
        ctx.fillRect  (board.x + paddingXY_x, board.y + paddingXY_y, board.x_size, board.y_size);
        ctx.strokeRect(board.x + paddingXY_x, board.y + paddingXY_y, board.x_size, board.y_size);
    }

    // sort by y
    sortBy('y')

    var paddingXZ_x = canvas.width / 4;
    paddingXZ_x = paddingXZ_x - (maxX * c0 - minX * c0) / 2;
    paddingXZ_x = paddingXZ_x + canvas.width / 2;
    paddingXZ_x = paddingXZ_x - minX * c0;

    var paddingXZ_z = canvas.height / 4;
    paddingXZ_z = paddingXZ_z - (maxZ * c0 - minZ * c0) / 2;
    paddingXZ_z = paddingXZ_z - minZ * c0;

    for (var i = 0; i < all_boards.length; i++) {
        var board = all_boards[i];
        changeColor(ctx, board);
        ctx.fillRect  (board.x + paddingXZ_x, board.z + paddingXZ_z, board.x_size, board.z_size);
        ctx.strokeRect(board.x + paddingXZ_x, board.z + paddingXZ_z, board.x_size, board.z_size);
    }

    // sort by x
    sortBy('x')
    var paddingYZ_y = canvas.width / 4;
    paddingYZ_y = paddingYZ_y - (maxY * c0 - minY * c0) / 2;
    paddingYZ_y = paddingYZ_y - minY * c0;

    var paddingYZ_z = canvas.height / 4;
    paddingYZ_z = paddingYZ_z - (maxZ * c0 - minZ * c0) / 2;
    paddingYZ_z = paddingYZ_z + (canvas.height / 2);
    paddingYZ_z = paddingYZ_z - minZ * c0;
    
    for (var i = 0; i < all_boards.length; i++) {
        var board = all_boards[i];
        changeColor(ctx, board);
        ctx.fillRect  (board.y + paddingYZ_y, board.z + paddingYZ_z, board.y_size, board.z_size);
        ctx.strokeRect(board.y + paddingYZ_y, board.z + paddingYZ_z, board.y_size, board.z_size);
    }
};

