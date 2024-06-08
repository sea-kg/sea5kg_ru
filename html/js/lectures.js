
function parsePageParams() {
  var loc = location.search.slice(1);
  var arr = loc.split("&");
  var result = {};
  var regex = new RegExp("(.*)=([^&#]*)");
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].trim() != "") {
          var p = regex.exec(arr[i].trim());
          // console.log("results: " + JSON.stringify(p));
          if(p == null) {
              result[decodeURIComponent(arr[i].trim().replace(/\+/g, " "))] = '';
          } else {
              result[decodeURIComponent(p[1].replace(/\+/g, " "))] = decodeURIComponent(p[2].replace(/\+/g, " "));
          }
      }
  }
  for (var p in result) {
      if (result[p] === "true") {
          result[p] = true;
      }
      if (result[p] === "false") {
          result[p] = false;
      }
  }
  console.log(JSON.stringify(result));
  return result;
}

function changeLocationState(newPageParams) {
	var url = '';
	var params = [];
	// console.log("changeLocationState");
	// console.log("changeLocationState, newPageParams = ", newPageParams);
	for(var p in newPageParams){
		params.push(encodeURIComponent(p) + "=" + encodeURIComponent(newPageParams[p]));
	}
	// console.log("changeLocationState", params);
	// console.log("changeLocationState", window.location.pathname + '?' + params.join("&"));
	window.history.pushState(newPageParams, document.title, window.location.pathname + '?' + params.join("&"));
	window.pageParams = parsePageParams();
}

window.pageParams = parsePageParams();

if (window.pageParams['p'] === undefined) {
  window.pageParams['p'] = 'slide0';
  changeLocationState(window.pageParams);
}


function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}


document.addEventListener("fullscreenchange", (event) => {
  // console.log("fullscreenchange", event);
  if (document.fullscreenElement === null) {
    console.log("fullscreen mode disabled");
    document.getElementById("menu_global").style.display = "";
    document.getElementById("btn_fullscreen").style.display = "";
    $('.lecture-slide').css({
      "max-height": "",
      "top": "",
    })
  } else {
    // console.log("fullscreen mode enabled");
    document.getElementById("menu_global").style.display = "none";
    // document.getElementById("btn_fullscreen").style.display = "none";
    $('.lecture-slide').css({
      "max-height": "100%",
      "top": "0px",
    })
  }
})

function updatePrevNextButtons() {
  var elements = document.getElementsByClassName('lecture-slide');
  if (window.current_slide == window.first_slide) {
    document.getElementById("btn_prev_slide").style.display = "none";
  } else {
    document.getElementById("btn_prev_slide").style.display = "";
  }

  if (window.current_slide == window.last_slide) {
    document.getElementById("btn_next_slide").style.display = "none";
  } else {
    document.getElementById("btn_next_slide").style.display = "";
  }
  var num_slide = window.current_slide.split('slide')[1];
  num_slide = parseInt(num_slide, 10) + 1;
  $('#text_page_slide').html(num_slide)

  window.pageParams['p'] = window.current_slide;
  changeLocationState(window.pageParams);
}

function moveSlide(diff) {
  var idx = window.slides_ids.indexOf(window.current_slide);
  var new_id = window.slides_ids[idx+diff];
  if (new_id === undefined) {
    console.error("Could not move at ", diff, " by position ", idx)
    return;
  }
  document.getElementById(window.current_slide).style.display = "none";
  document.getElementById(new_id).style.display = "";
  window.current_slide = new_id;
  updatePrevNextButtons();
}

document.addEventListener('DOMContentLoaded', function() {
  var elements = document.getElementsByClassName('lecture-slide');
  // init list of slides
  window.current_slide = window.pageParams['p']
  window.slides_ids = [];
  for (var el = 0; el < elements.length; el++) {
    var elem_id = "slide" + el;
    window.slides_ids.push(elem_id);
    // console.log(elements[el])
    elements[el].setAttribute("id", elem_id);
    if (el == 0) {
      window.first_slide = elem_id;
    }
    if (elem_id != window.current_slide) {
      elements[el].style.display = "none";
    }
    if (el == elements.length - 1) {
      window.last_slide = elem_id;
    }
  }
  if (window.slides_ids.indexOf(window.current_slide) == -1) {
    window.current_slide = window.slides_ids[0];
  }
  updatePrevNextButtons();
});

document.addEventListener("keydown", function(event) {
  // console.log(event.code);
  if (event.code == "ArrowDown" || event.code == "ArrowRight") {
    moveSlide(1);
  }
  if (event.code == "ArrowUp" || event.code == "ArrowLeft") {
    moveSlide(-1);
  }
})
