$(document).ready(function () {
  const subjects = 32; // n_subject * 2
  // const subjects = 16;
  const n_display = 1;
  const n = 59;
  const delay = 10;
  const offset = 5;
  const sliderWidth = $("#slider_relit").width() - $("#slider_relit_circle").width() - 2 * offset;
  let animator = setTimeout(animate, delay);
  let counter = 0;
  let drag = 0;
  let show_idx = 0;
  let show_counter = 0;
  let img_size = 160;

  for (let i = 0; i < subjects; i+=2) {

    if (show_counter < n_display){
      show_counter ++;
    }
    else{
      // show_counter = 1;
      show_idx++;
    }

    // console.log(show_idx, show_counter)
    $(`#relit_fig_${show_idx}`).css("text-align", "center")
    // Input 
    $(`#relit_fig_${show_idx}`).append(`<div id='relit_io_input_${i}' class='relit_io_img' draggable='false'>`)
    $(`#relit_io_input_${i}`).css("background-position-x", `${0}px`);
    $(`#relit_io_input_${i}`).css("background-position-y", `${-img_size * show_idx}px`);
    // Target
    $(`#relit_fig_${show_idx}`).append(`<div id='relit_io_target_${i}' class='relit_io_img' draggable='false'>`)
    $(`#relit_io_target_${i}`).css("background-position-x", `${-img_size}px`);
    $(`#relit_io_target_${i}`).css("background-position-y", `${-img_size * show_idx}px`);
    // Output
    $(`#relit_fig_${show_idx}`).append(`<div id='relit_io_output_${i}' class='relit_io_img' draggable='false'>`)
    $(`#relit_io_output_${i}`).css("background-position-x", `${-img_size * 2}px`);
    $(`#relit_io_output_${i}`).css("background-position-y", `${-img_size * show_idx}px`);
    // Animated
    $(`#relit_fig_${show_idx}`).append(`<div id='relit_${i}' class='relit_img' draggable='false'>`)
    $(`#relit_${i}`).css("background-position-y", `${-img_size * i}px`);
  }

  function updateImages(frame) {
    for (let i = 0; i < subjects; i++) {
      $(`#relit_${i}`).css("background-position-x", `${-img_size * frame}px`);
    }
  }

  function updateCircle(x) {
    $("#slider_relit_circle").css("left", x + "px");
    let t = (x - offset) / sliderWidth;
    let c = (1 - t) * 128 + (t) * 180;  // 0 to 180
    let c2 = (1 - t) * 180 + (t) * 128;  // 128 to 90
    $("#slider_relit_circle").css("background-color", `rgb(${c}, ${c}, ${c})`);
    $("#slider_relit_right").css("background-color", `rgb(${c2}, ${c2}, ${c2})`);
  }

  function animate() {
    let t = 0.5 * (1 + Math.sin(counter));
    updateImages(Math.floor(t * n));
    updateCircle(t * sliderWidth + offset);
    // console.log("VALUE CHECK : " + $("#relit_ani_button").val());
    if ($("#relit_ani_button").val() != "Pause"){
    }
    else {
      counter += 0.01;
    }
    animator = setTimeout(animate, delay);
  }

  $("#relit_ani_button").click(function (){
    if ($(this).val() == "Pause") {
      $(this).val("Play");
      $(this).html("Play");
    }
    else{
      $(this).val("Pause");
      $(this).html("Pause");
      }
    });


  function updateWithEvent(e) {
    let x = (e.pageX - $("#slider_relit").offset().left) - parseInt($("#slider_relit_circle").width()) / 2;
    if (x < offset) x = offset;
    if (x >= sliderWidth + offset) x = sliderWidth + offset - 1;
    let t = (x - offset) / sliderWidth;
    counter = Math.asin(t / 0.5 - 1);
    updateImages(Math.floor(t * n));
    updateCircle(x);
  }

  $("#slider_relit").mousedown(function(e) {
    drag = 1;
    clearTimeout(animator);
    updateWithEvent(e);
  });

  $(document).mouseup(function(e) {
    drag = 0;
    clearTimeout(animator);
    animator = setTimeout(animate, delay);
  });

  $(document).mousemove(function (e) {
    if (!drag) return;
    updateWithEvent(e);
  });
});