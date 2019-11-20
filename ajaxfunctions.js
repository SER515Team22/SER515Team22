
var token = "";
var standard = "";
var type = "";

function evalexpr() {
    var access_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjc5NjkxN2UxMTBhNGI3OTVmYTFjMyIsInVzZXJuYW1lIjoiaWRoYW50OTYiLCJleHAiOjE1NzgyNjkwMTcsImlhdCI6MTU3MzA4NTAxN30.FXlY086WPuh1VPwBhtoRkqI_T_Tx5duZoMzB3FA_x_4";  
    $.ajax({
    url: 'http://54.190.28.10:3000/evaluate',
    type: 'POST',
	async:true,
	beforeSend : function( xhr ) {
        xhr.setRequestHeader( "Authorization",access_token );
    },
    data: JSON.stringify({
        "exp": "12 + 2",
        "valid": "1",
        "u_id": "121"
    }),
	contentType: "application/json; charset=utf-8",
	cache: false,
	dataType: "JSON",
    success: function (data) { console.log(data);},
    error: function (e) { console.log(e); },
    });
  }

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
		token = data.token;
		standard = data.standard;
		type = data.type;
    },
    error: function (e) {
	    console.log("ERROR: ", e.statusText);
	    token = "";
    }
    });
    console.log(token,standard,type);

}
