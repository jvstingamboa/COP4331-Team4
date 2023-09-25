
<?php //SignUp.php
//    header("Access-Control-Allow-Origin: *");
//    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
//    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
   $inData = getRequestInfo();
   
   $id = 0;
   $username = "";
   $firstName = "";
   $lastName = "";
   $password = "";

   //connecting to the database
   $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
   if( $conn->connect_error )
   {
       returnWithError( $conn->connect_error );
   }
   else
   {
       // connected - adding new data to DB

        // Edited from "Login.php"
       $stmt = $conn->prepare("SELECT ID, Login, Password FROM Users WHERE Login=? AND Password =?");
       $stmt->bind_param("ss", $inData["login"], $inData["password"]);
       $stmt->execute();
       $result = $stmt->get_result();

       if( $row = $result->fetch_assoc() ){
            returnWithError("Username Unavailable.");
       }
       else{
            //$conn = "INSERT INTO `Users` ( `username`, `password`, `date`) VALUES ('$username', '$hash', current_timestamp())";

            //Edited from AddColor.php
            $stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
            $stmt->bind_param("ss", $firstName, $lastName, $username, $password);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            returnWithError("");
       }
       
       $stmt->close();
       $conn->close(); 
   }


   function getRequestInfo()
   {
       return json_decode(file_get_contents('php://input'), true);
   }

   function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

   function returnWithError( $err )
	{
		//$retValue = '{"username":"","firstName":"","lastName":"","password":"","error":"' . $err . '"}';
		$retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
	}
?>