
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
    
    var a_list = document.getElementById('album_list');
    a_list.style.display = 'flex';
    var a_play = document.getElementById('album_play');
    a_play.style.display = 'none';

    a_list.innerHTML = '';

    for (var i in window.albums) {
        var a = window.albums[i];
        
        console.log(name);
        var a_content = '<div class="sea5kg-album" onclick="openAlbum(\'' + a.id + '\');">'
            + '<img width=100% height=100% src="./' + a.id + '/cover.jpg">'
            + '</div>';
        a_list.innerHTML += a_content;
    }
}

function openAlbum(folder) {
    changeLocationState({"album": folder});

    var a_list = document.getElementById('album_list');
    a_list.style.display = 'none';
    var a_play = document.getElementById('album_play');
    a_play.style.display = 'block';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './' + folder + '/content.json', false);
    xhr.send();
    if (xhr.status != 200) {
        console.error( xhr.status + ': ' + xhr.statusText);
    } else {
        var content = JSON.parse(xhr.responseText);
        album_name.innerHTML = content.name.en + ' (' + content.year + ')';
        album_track_list.innerHTML = '<div class="sea5kg-record-empty"></div>';
        album_cover.style["background-image"] = 'url("' + folder + '/cover.jpg")';
        for (var i in content.playlist) {
            var t = content.playlist[i];
            album_track_list.innerHTML += ''
                + '<div class="sea5kg-record">'
                + '  <div class="sea5kg-record-name">' + t.trackid + '. ' + t.name.en + '</div>' 
                + '</div>'
                + '<div class="sea5kg-record">'
                + '  <div class="sea5kg-record-line"><audio controls src="./' + folder + '/' + t.filename + '"> Not supported. </audio></div>' 
                + '</div>'
                + '<div class="sea5kg-record-empty"></div>'
            ;
            
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    if (containsPageParam("album")) {
        openAlbum(window.pageParams["album"]);
    } else {
        openAlbumList();
    }
});