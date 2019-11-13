var expressionArray = new Array();
var pageCount = 1;
var endPage = 4;

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
    if (pageCount == 1) {
        previousButton.style.visibility = 'hidden';
    }
}

function submitExpression() {

    
}