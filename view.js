var expressionArray = new Array();
var pageCount = 1;
var endPage = 0;
var xhttp = new XMLHttpRequest();
var questionArray = new Array();
      
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var questions = response.questions;

        endPage = questions.length;
        for(var i = 0;i < questions.length;i++){
            questionArray.push(questions[i]);
        }
        document.getElementById('question').innerHTML = questionArray[0];
        }
    };
    xhttp.open("GET", "questionsFile.json", true);
    xhttp.send();

function saveExp() {
  
    var URL = URL;
    var expression = document.getElementById("answer").value;
    var data = expression;
    expressionArray.push(expression);
    
    alert(expressionArray)
    alert(eval(data));
}  

function nextView() {

    pageCount = pageCount + 1;
    var pageNum = document.getElementById("questionNo");
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var submitButton = document.getElementById("submit");
    pageNum.innerHTML = "Question " + pageCount;
    document.getElementById('question').innerHTML = questionArray[pageCount-1];
    if (pageCount == 2) {

        previousButton.style.visibility = 'visible';
    }
    if (pageCount == endPage) {

        nextButton.style.visibility = 'hidden';
        submitButton.style.visibility = 'visible';
    }
}

function previousView() {

    pageCount = pageCount - 1;
    var pageNum = document.getElementById("questionNo");
    var previousButton = document.getElementById("previous");
    pageNum.innerHTML = "Question " + pageCount;
    document.getElementById('question').innerHTML = questionArray[pageCount-1];
    if (pageCount == 1) {
        previousButton.style.visibility = 'hidden';
    }
}

function submitExpression() {


}

