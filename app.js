function initialize (rows, cols) {
  let rows = rows || 20;
  let cols = cols || 20;
  let cell_size = 20;
}

function center_grid(rows, cols){
  let grid = $( "main" );
  let winX = $( window ).width();
  let winY = $( window ).height();
  grid.css({
    "width": (20 * 20) + "px",
    "height": (20 * 20) + "px",
  });
  grid.css({
    "top": ((winY/2)-(parseInt(grid.css("height"))/2)),
    "left": ((winX/2)-(parseInt(grid.css("width"))/2))
  })  
  console.log(winX, winY)
}

function set_cells(rows, cols){
  for(let r = 0; r < rows; r++)
    for(let c = 0; c < cols; c++)
      $( "main" ).append("<div class='griddle'></div>");
}

center_grid();
set_cells(20,20);

let draw = false;
let color = "red"
$( "main" ).on("mousedown", ".griddle", function(evt) {
  evt.preventDefault();
  $( this ).addClass(color);
  draw = true;
})

$( "main" ).on("mouseup", ".griddle", function() {
  draw = false;
})

$( "main" ).on("click", ".griddle", function() {
  $( this ).addClass(color);
})

$( "main" ).on("mouseover", ".griddle", function() {
  if (draw){
    $( this ).addClass(color);
  }
})
