//Author Name : Prashant Singh

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

  var data = expression;

  alert(eval(data));

}

function evaluateExpStd1(){

  var data = expression;

  console.log(data)

  var position = data.search('g') || data.search('l') || data.search('e') || data.search('n')

  console.log(position)

  if (position == -1){
    alert("incorrect input")
  }

  var operator1 = data.slice(0, position)
  var operator2 = data.slice(position + 1,)


  if ((operator1 > operator2) && (data.slice(position, position+1) == 'g')){
    alert(operator1 + " is greater than " + operator2)
  }

  else if ((operator1 < operator2) && (data.slice(position, position+1) == 'l')){
    alert(operator1 + " is less than " + operator2)
  }

  else if ((operator1 == operator2) && (data.slice(position, position+1) == 'e')){
    alert("The numbers are equal")
  }

  else if ((operator1 != operator2) && (data.slice(position, position+1) == 'n')){
    alert("The numbers are not equal")
  }
}

function sendFormDataViewSubmission(){

  alert("method called")

  $(document).ready(function(){
  $("#getSubmissionDetails").click(function(e)
  {
  var form = $("#submissionView").serializeJSON();
   $.ajax(
   {
   url : "",
   type: "POST",
   data : {valArray:form},
   success:function(data)
   {
    catchData()
   },
   error: function(jqXHR, textStatus, errorThrown)
   {
   }
   });
   e.preventDefault(); //STOP default action

  });
  });
}