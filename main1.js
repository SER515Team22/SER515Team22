//Author Name : Prashant Singh

var global_value;
var buffer = '';
var dynamic_src = '';
var expression = '';
var URL = '';
var global_test;
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
  buffer = global_value;
  expression = expression + global_value;
  console.log(expression);

  let img = this.getElementsByTagName('img')[0];
  global_test = img;
  console.log(img);
  img.src = dynamic_src;
  
  // console.log(global_value);
  // this.append(fills[global_value-1]);
}

function clearLast() {
  var temp = "";
  global_test.src = temp;
  expression = expression.slice(0,expression.length-1);
  
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
  var inputs = document.getElementById("submissionView").elements;
  var standard = inputs["standardList"].value;
  var assignment = inputs["assignmentList"].value;
  var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjc5NjkxN2UxMTBhNGI3OTVmYTFjMyIsInVzZXJuYW1lIjoiaWRoYW50OTYiLCJleHAiOjE1Nzk0MTAwNDAsImlhdCI6MTU3NDIyNjA0MH0.Ey5KJFlPrf3eoXWrsO2MMKykHyFy2bxnvZz4TL8UAtY"
  dataobj = {
      "standard": standard,
      "assignment": assignment
  }

  dobj = JSON.stringify(dataobj);
  console.log("Ajax now");

  $.ajax({
  type: "GET",
  beforeSend : function(xhr) {
    xhr.setRequestHeader("Authorization" , token);
  },
  url: "http://54.190.28.10:3000/viewsubmissions",
  data: dobj,
  contentType: "application/json; charset=utf-8",
  async: false,
  cache: true,
  dataType: "JSON",
  success: function(data) {
  console.log("Done",data);
  student_id = data.username;
  answer = data.ans;

  var length = data.length;
  var disp = "";

  if (length > 0){
    for (var i = 0 ; i<length; i++){
      if(data[i].username && data[i].ans){
        disp += "<tr><td>" + data[i].username + "</td><td>" + data[i].ans + "</td><tr>";
      }
    }

    if (disp != ""){
      $("#submissionTable").append(disp).removeClass("hidden");
    }
  }
  },
  error: function (e) {
  console.log("ERROR: ", e.statusText);
  }
  });
  console.log(standard,assignment);
}
