

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}


document.addEventListener("fullscreenchange", (event) => {
  console.log("fullscreenchange", event);
  if (document.fullscreenElement === null) {
    console.log("fullscreen mode disabled");
    document.getElementById("menu_global").style.display = "";
    document.getElementById("btn_fullscreen").style.display = "";
  } else {
    console.log("fullscreen mode enabled");
    document.getElementById("menu_global").style.display = "none";
    document.getElementById("btn_fullscreen").style.display = "none";
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
  window.slides_ids = [];
  for (var el = 0; el < elements.length; el++) {
    var elem_id = "slide" + el;
    window.slides_ids.push(elem_id);
    // console.log(elements[el])
    elements[el].setAttribute("id", elem_id);
    if (el == 0) {
      window.current_slide = elem_id;
    }
    if (el == 0) {
      window.first_slide = elem_id;
    }
    if (el != 0) {
      elements[el].style.display = "none";
    }
    if (el == elements.length - 1) {
      window.last_slide = elem_id;
    }
  }
  updatePrevNextButtons();
});

document.addEventListener("keydown", function(event) {
  console.log(event.code);
  if (event.code == "ArrowDown" || event.code == "ArrowRight") {
    moveSlide(1);
  }
  if (event.code == "ArrowUp" || event.code == "ArrowLeft") {
    moveSlide(-1);
  }
})
