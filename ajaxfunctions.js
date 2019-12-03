//Author : Gayathri Sitaraman
//Author Name : Prashant Singh

var standard = "";
var type = "";

var global_value;
var dynamic_src = '';
var expression = '';
var URL = '';
let fills = document.querySelectorAll('.fill');
let empties = document.querySelectorAll('.empty');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjc5NjkxN2UxMTBhNGI3OTVmYTFjMyIsInVzZXJuYW1lIjoiaWRoYW50OTYiLCJleHAiOjE1Nzk1MDAyMTAsImlhdCI6MTU3NDMxNjIxMH0.s6cpn9rYn1pDhEqmhiCSUQXUfJ3vq2e075m0ClHeBV0";



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
  console.log("Ajax now");
  var standard = "2";
  var assignment = "20";
  $.ajax({
  type: "GET",
  beforeSend : function(xhr) {
    xhr.setRequestHeader("Authorization" , token);
  },
  url: "http://54.190.28.10:3000/viewsubmissions",
  contentType: "application/json; charset=utf-8",
  async: true,
  data: {standard: standard, assnumber: assignment},
  crossDomain: true,
  dataType: "json",
  success: function(data) {
	  console.log("Done",data);
  for ( var p in data) {
	  console.log(data[p]);
  }
  var disp = "";
  console.log("Inside sucess");
  console.log("length",data.data.length);
  if (data){
    for (var i=0; i<data.data.length;i++){
      console.log("Yo data",data.data[i].username);
      if(data.data[i].username && data.data[i].ans){
	console.log("Hello all",);
        disp += "<tr><td>" + data.data[i].username + "</td><td>" + data.data[i].ans + "</td><tr>";
	console.log("Display",disp);
      }
    }

    if (disp != ""){
      console.log("Hello submission");
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



//Function to evaluate
function evalExpr() {
    console.log("hellooo sjdhjsdjhjjh");
    console.log(expression);
    console.log(token);
    const access_token = token;  
    var dataobj = {
        "exp": expression,
        "valid": "1",
        "u_id": "121"
    }
    var dobj = JSON.stringify(dataobj);
    console.log(dobj);
    $.ajax({
    url: 'http://54.190.28.10:3000/evaluate',
    type: 'POST',
	async:false,
	beforeSend : function( xhr ) {
        xhr.setRequestHeader( "Authorization",access_token );
    },
    data: dobj,
    contentType: "application/json; charset=utf-8",
    cache: false,
    dataType: "JSON",
    success: function (data) { console.log("Successful"); 
	    if(data.errormsg != "") { 
		    alert(data.errormsg); 
	    }
	    else {
		    alert(data.result);
	    }
	    },
    error: function (e) { console.log("ERROR",e); },
    });
  }


//Fucntion to send login data

function sendData() {
    
    console.log("hellooo");
    console.log("iSending");
    var inputs = document.getElementById("form1").elements;
    var uname = inputs["username"].value;
    var pass = inputs["pass"].value;
    dataobj = {
	"username": uname,
        "password": pass
    }
    dobj = JSON.stringify(dataobj);
    console.log("Ajax now");
    $.ajax({
    type: "POST",
    url: "http://54.190.28.10:3000/login",
    data: dobj,
    contentType: "application/json; charset=utf-8",
    async: false,
    cache: true,
    dataType: "JSON",
    success: function(data) {
	    console.log("Done",data);
		//token = data.token;
		standard = data.standard;
		type = data.type;
    },
    error: function (e) {
	    alert("ERROR: ", e.statusText);
	//    token = "";
            type = "";
    }
    });
    console.log(token ,standard ,type);
    //writeIntoFile(token);
     if (type == "Faculty"){
            window.location.href = "FacultyPortal/FacultyPortalindex.html";
        }

        if (type == "Student" && standard == "1"){
            window.location.href = "mainWindowStd1.html";
        }

        if (type == "Student" && standard == "6"){
            window.location.href = "mainWindowStd6.html";
        }

}


//Function to send registration data

function sendRegistrationDetails(){
    console.log("hdsjhjhsdjhh");
	var status = "";
	var data = {
		username: document.getElementById('name').value,
		email: document.getElementById('email').value,
                type: document.getElementById('input').value,
		password: document.getElementById('pwd').value,
                standard: document.querySelector('#grade').value
	}
	console.log("Before stringify",data);
	dobj= JSON.stringify(data);
	console.log(dobj);
	$.ajax({
		type: "POST",
                url: "http://54.190.28.10:3000/register",
		data: dobj,
		contentType: "application/json; charset=utf-8",
		async: false,
		cache: true,
		dataType: "JSON",
		success: function(data) {
			console.log("Register ", data);
	                status = data.status;
		},
		error: function (e) {
			console.log("ERROR: ", e.statusText);
		}
    });

    if(status == "Not registered") {
	    console.log("not registered");
	    alert(status);
    }
	else {
		window.location.href = "loginIndex.html";
	}
}



//Function to post assignment

function postAssignment() {
    console.log("hellooo");
    console.log("iSending");
	const access_token = token; 
    var ques = ["1","2","3"];
    var inputs = document.getElementById("formasspost").elements;
    ques[0] = inputs["question1"].value;
    ques[1] = inputs["question2"].value;
    ques[2] = inputs["question3"].value;
    var assnumber = inputs["assignmentNo"].value;
    var standard = inputs["grade"].value;
    var data = {
		"username" : "idhant96",
		"assnumber": assnumber,
		"standard": standard,
		"questions": ques
    }
    var dobj = JSON.stringify(data);
	$.ajax({
	type: "POST",
        url: "http://54.190.28.10:3000/newass",
	data: dobj,
	contentType: "application/json; charset=utf-8",
	async: false,
	beforeSend : function( xhr ) {
        xhr.setRequestHeader( "Authorization",access_token );
    },
	cache: true,
	dataType: "JSON",
	success: function(data) {
		console.log("post data status ", data);
	        status = data.status;
	},
	error: function (e) {
		console.log("ERROR: ", e.statusText);
	}
    });
}    
	

//Function to post answers - for student

function sendSubmission() {
	const access_token = token;
	var inputs = document.getElementById("submitSolution");
	var ques = ["What is 1+5","what is 5*3","What is 9+4"];
	var ans[0] = inputs["answer1"].value;
	var ans[1] = inputs["answer2"].value;
	var ans[2] = inputs["answer3"].value;
	var data = {
		"username": "idhant96",
		"assnumber": "1",
		"standard": "6",
		"answers": ans,
		"questions": ques
	}
	var dobj = JSON.stringify(data);
	$.ajax({
	type: "POST",
        url: "http://54.190.28.10:3000/newsubmit",
	data: dobj,
	contentType: "application/json; charset=utf-8",
	async: false,
	beforeSend : function( xhr ) {
        xhr.setRequestHeader( "Authorization",access_token );
    },
	cache: true,
	dataType: "JSON",
	success: function(data) {
		console.log("post data status ", data);
	        status = data.status;
	},
	error: function (e) {
		console.log("ERROR: ", e.statusText);
	}
    });
	

}











//Function to view assignment for students
function getAssignment1(){
  var inputs = document.getElementById("assignment1");

  var standard = "standard6";
  var assignment = "assignment1";
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
  url: "http://54.190.28.10:3000/viewass",
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


