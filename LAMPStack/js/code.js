const urlBase = 'http://142.93.186.91/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("emailAddress").value;
	let password = document.getElementById("loginPassword").value;

	// remember = document.getElementById("checkbox").
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	//xhr.open("POST", url, true);
	xhr.open("POST", "http://142.93.186.91/LAMPAPI/Login.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignUp()
{
	userId = 0;
	username = "";
	firstName ="";
	lastName="";

	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
	let login = document.getElementById("userName").value;
	let password = document.getElementById("loginPassword").value;

	if(login == "" || password == "" || firstName == "" || lastName == "")
	{
		document.getElementById("signupResult").innerHTML ="Fill in all SignUp information";
		return;
	}
	
	// remember = document.getElementById("checkbox").
//	var hash = md5( password );
	
	//document.getElementById("loginResult").innerHTML = "";

	//let tmp = {login:login,password:password};
	let tmp = {login:login, password:password, firstName:firstName, lastName:lastName};//new edit
//	var tmp = {login:login,password:hash, firstName:firstName, lastName:lastName};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/SignUp.' + extension; //edited

	let xhr = new XMLHttpRequest();
	//xhr.open("POST", url, true);
	xhr.open("POST", "http://142.93.186.91/LAMPAPI/SignUp.php", true); //url = "http://142.93.186.91/LAMPAPI/SignUp.php"
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function() 
		{
			//console.log("readystatechangetest");
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("readystate == 4 && status == 200 success");
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;
				console.log("json id test");
		
				if( userId > 1 )// changed to greater than 1
				{		
					console.log("userId test success");
					document.getElementById("signupResult").innerHTML = "Username already taken";
					//return;
				}
				else{
					document.getElementById("signupResult").innerHTML = "Succesfully created account Userid = " + userId;
					//window.location.href = "/index.html"; //commented for testing
				}
		
				//commented code is remains from doLogin()
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				// login = jsonObject.login;
				// password = jsonObject.password;

				// saveCookie();

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}
}
//NEW: Delete User function (needS testing)
function deleteUser()
{
	let login = document.getElementById("deleteUsername").value;
	let userId = document.getElementById("deleteId").value;
	
	let tmp ={login:login, userId:userId};

	let jsonPayload = JSON.stringify( tmp );

	let xhr = new XMLHttpRequest();
	//xhr.open("POST", url, true);
	xhr.open("POST", "http://142.93.186.91/LAMPAPI/DeleteUser.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse(xhr.responseText);
				let boolean = jsonObject.result;
				//userId = jsonObject.id;
		
				if( boolean == true)
				{		
					document.getElementById("deleteResult").innerHTML = "User was successfully Deleted!";
					return;
				}

				else
				{
					document.getElementById("deleteResult").innerHTML = "No user with these credentials exist";
				}

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("deleteResult").innerHTML = err.message;
	}
}

//Not finished
function addContact()
{
	let login = document.getElementById("deleteUsername").value;
	let userId = document.getElementById("deleteId").value;
	
	let tmp ={login:login, userId:userId};

	let jsonPayload = JSON.stringify( tmp );

	let xhr = new XMLHttpRequest();
	//xhr.open("POST", url, true);
	xhr.open("POST", "http://142.93.186.91/LAMPAPI/DeleteUser.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

}
//Not finished
function updateContact()
{
	let login = document.getElementById("deleteUsername").value;
	let userId = document.getElementById("deleteId").value;
	
	let tmp ={login:login, userId:userId};

	let jsonPayload = JSON.stringify( tmp );

	let xhr = new XMLHttpRequest();
	//xhr.open("POST", url, true);
	xhr.open("POST", "http://142.93.186.91/LAMPAPI/DeleteUser.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

}
//Not finished
function searchContact()
{
	let login = document.getElementById("deleteUsername").value;
	let userId = document.getElementById("deleteId").value;
	
	let tmp ={login:login, userId:userId};

	let jsonPayload = JSON.stringify( tmp );

	let xhr = new XMLHttpRequest();
	//xhr.open("POST", url, true);
	xhr.open("POST", "http://142.93.186.91/LAMPAPI/DeleteUser.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "/index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function deleteColor()
{
	
}
