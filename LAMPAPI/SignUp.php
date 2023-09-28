
<?php //SignUp.php
    //code to show PHP errors
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
   $inData = getRequestInfo();
   
   $id = 1;
   $login = $inData["login"];//new
   $firstName = $inData["firstName"];//new
   $lastName = $inData["lastName"];//new
   $password = $inData["password"];//new

   //connecting to the database
   $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
   if( $conn->connect_error )
   {
       returnWithError( $conn->connect_error );
   }
   else
   {
       // connected - finding if data is in DB

        // Edited from "Login.php"
       $stmt = $conn->prepare("SELECT ID, Login FROM Users WHERE Login=?");//
       $stmt->bind_param("s", $inData["login"]);
       $stmt->execute();
       $result = $stmt->get_result();

       if( $row = $result->fetch_assoc() )
       {
            returnWithInfo( $inData['firstName'], $inData['lastName'], $row['ID'] ); 
            //returnWithError("Username Unavailable.");
       }

       else
       {
            $stmt->close();
            
            //$conn = "INSERT INTO `Users` ( `username`, `password`, `date`) VALUES ('$username', '$hash', current_timestamp())";
            //Edited from AddColor.php
            $stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
            $stmt->bind_param("ssss", $firstName, $lastName, $login, $password);// new edit
            $stmt->execute();
            $result = $stmt->get_result();

            returnWithInfo( $inData['firstName'], $inData['lastName'], $id);
           
            
            //returnWithError("");
            //Only one stmt-close was needed, was causing a 500 error
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

    // added returnWithInfo with 5 values: $firstName, $lastName, $login, $password, $id
    function returnWithInfo( $firstName, $lastName, $id )
	{
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		//$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","login":"' . $login . '","password":"' . $password . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>