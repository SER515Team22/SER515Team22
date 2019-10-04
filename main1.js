var global_value;
var dynamic_src = '';
var expression = '';
var URL = '';
let fills = document.querySelectorAll('.fill');
let empties = document.querySelectorAll('.empty');


for (let fill of fills){
  fill.addEventListener('dragstart', dragStart);
  fill.addEventListener('dragend', dragEnd);
}
// Loop through empty boxes and add listeners
for (let empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
  global_value = this.id;
  dynamic_src = this.src;
  console.log(dynamic_src);
  this.className += ' hold';
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop(e) {
  this.className = 'empty';
  console.log(expression);
  expression = expression + global_value;
  console.log(expression);

  let img = this.getElementsByTagName('img')[0];
  console.log(img);
  img.src = dynamic_src;
  
  // console.log(global_value);
  // this.append(fills[global_value-1]);
}


function evaluateExp() {
  
  var URL = URL;
  var data = expression;

  $.ajax({
          dataType: 'json',
          url: URL,
          type: "POST",
          data: data,
          // cache: false,

        success: function(data){
          alert(data);
        },

        error: function(){
            alert("Unable to evaluate, contact admin");
        }
          });
}