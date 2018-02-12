// (ARRAY)  Palette of color to be used
const PALETTE = [ "red", "pink", "purple", "deep-purple", "indigo",
                  "blue", "light-blue", "cyan", "teal", "green", "light-green",
                  "lime", "yellow", "amber", "orange", "deep-orange", "brown",
                  "grey", "blue-grey", "white",  "black" ];
const WIN = $( window );
const GRID = {
  grid: $( "main" ),    // (NODE)   The grid container
  width: 0,             // (NUMBER) The width of the container
  height: 0,            // (NUMBER) The height of the container
  cell_size: 20,        // (NUMBER) Size of grid cells
  rows: 20,             // (NUMBER) Number of rows
  cols: 20,             // (NUMBER) Number of cols
  drawable: false,      // (BOOL)   Can the grid cells be drawn to
  color: "red",         // (STRING) The currently selected color
  set_container: function () {
    this.width = this.cols * this.cell_size;
    this.height = this.cols * this.cell_size;
    this.grid.css({
      width: this.width + "px",
      height: this.height + "px"
    });
  },
  center_container: function () {
    let top = (WIN.height() / 2) - (this.height / 2);
    let left = ((WIN.width()) / 2) - (this.width / 2);
    console.log(top, left);
    this.grid.css({
      top: top + "px",
      left: left + "px"
    })
  },
  draw: function (self) {
    var curColor = ( $( self ).attr( "class" ) ).split(' ')[1];
    if (curColor != this.color || curColor == "clear"){
      $( self ).removeClass(curColor);
    }
    $( self ).addClass(this.color);
  },
  set_events: function () {
    // Start Drawing
    $( "main" ).on( "mousedown", ".griddle", function( evt ) {
      evt.preventDefault();
      GRID.drawable = true;
      if( GRID.drawable ) { GRID.draw( $( this ) ); }
    });

    // Draw when crossing to new cell
    $( "main" ).on( "mouseover", ".griddle", function() {
      if( GRID.drawable ) { GRID.draw( $( this ) ); }
    });

    // Disable drawing no matter where the mouse button is released.
    $( document ).on( "mouseup", function() {
      GRID.drawable = false;
    });
  },
  initialize: function () {
    this.grid.empty();
    this.set_container();
    this.center_container();
    set_cells(this.rows, this.cols, this.cell_size, this.grid);
    this.set_events();
  }
};

//// HELPER FUNCTIONS
// Makes a group of divs with the .griddle class
function set_cells(rows, cols, size, location){
  let frag = document.createDocumentFragment();
  let style = "width:" + size + "px; height:" + size + "px";
  for(let r = 0; r < rows; r++){
    for(let c = 0; c < cols; c++){
      let cell = document.createElement("div");
      cell.className = "griddle";
      cell.style.cssText = style;
      $( frag ).append( cell) ;
    }
  }
  $( location ).append( frag );
}

//// ASIDE FUNCTIONS
// Used to add colors to palette
function colorize_palette (color_palette) {
  var cells = $( "#palette" ).children();
  cells.each(function(x){
    if ( color_palette[x] === undefined){
      $( this ).addClass("clear");
    } else {
      $( this ).addClass(color_palette[x]);
    }
  });
}

////// EVENT LISTENERS
//// Input Number Listeners
$( "#i_set-grid" ).on( "click", function(){
  let rows = $( "#i_rows" )[0].value;
  let cols = $( "#i_cols" )[0].value;
  if ( rows >= 1  && cols >= 1 ){
    GRID.cols = cols;
    GRID.rows = rows;
    GRID.initialize();
  } else {
    $( "#i_rows" )[0].value = 20;
    $( "#i_cols" )[0].value = 20;
  }
})

//// Palette Listeners
$( "#palette" ).on( "click", ".griddle", function() {
  var getColor = ($( this ).attr ("class" ));
  GRID.color = getColor.split(' ')[1];
});
////// INITIALIZE
set_cells( 4, 6, 35, "#palette");
colorize_palette(PALETTE);
GRID.initialize();