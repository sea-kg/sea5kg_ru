
function parsePageParams() {
    var loc = location.search.slice(1);
    var arr = loc.split("&");
    var result = {};
    var regex = new RegExp("(.*)=([^&#]*)");
    for(var i = 0; i < arr.length; i++){
        if(arr[i].trim() != ""){
            var p = regex.exec(arr[i].trim());
            // console.log("results: " + JSON.stringify(p));
            if(p == null)
                result[decodeURIComponent(arr[i].trim().replace(/\+/g, " "))] = '';
            else
                result[decodeURIComponent(p[1].replace(/\+/g, " "))] = decodeURIComponent(p[2].replace(/\+/g, " "));
        }
    }
    // console.log(JSON.stringify(result));
    return result;
}

window.pageParams = parsePageParams();


function containsPageParam(name){
    return (typeof pageParams[name] !== "undefined");
}

function changeLocationState(newPageParams){
    var params = [];
    // console.log("changeLocationState, newPageParams = ", newPageParams);
    for(var p in newPageParams){
        params.push(encodeURIComponent(p) + "=" + encodeURIComponent(newPageParams[p]));
    }
    window.history.pushState(newPageParams, document.title, window.location.pathname + '?' + params.join("&"));
    window.pageParams = parsePageParams();
}

function openAlbumList() {
    changeLocationState({});
    
    var a_list = document.getElementById('picture_list');
    a_list.style.display = 'flex';

    a_list.innerHTML = '';

    for (var i in window.pictures) {
        var a = window.pictures[i];
        
        console.log(name);
        var a_content = '<div class="sea5kg-picture" onclick="openFullPicture(\'' + a.id + '\');">'
            + '<img width=100% height=100% src="./images/' + a.id + '-250x250.jpg">'
            + '<div class="sea5kg-picture-caption">' + a.year + ' - ' + a.name + '</div>'
            + '</div>';
        a_list.innerHTML += a_content;
    }
}

function closeFullPicture() {
    picture_full_contaner.style.display = '';
    picture_full.style["background-image"] = null;
    changeLocationState({});
}

function openFullPicture(picid) {
    changeLocationState({"picid": picid});
    var picture_info = null;
    for (var i in window.pictures) {
        var a = window.pictures[i];
        if (a.id == picid) {
            picture_info = a;
        }
    }
    if (picture_info == null) {
        closeFullPicture();
        console.waring("Not found picture");
        return;
    }
    picture_full_contaner.style.display = 'block';
    picture_full_name.innerHTML = picture_info.year + " - " + picture_info.name;
    picture_full.style["background-image"] = 'url("images/' + picid + '-full.jpg")';
}

document.addEventListener("DOMContentLoaded", function(event) {
    openAlbumList();

    if (containsPageParam("picid")) {
        openFullPicture(window.pageParams["picid"]);
    }
});