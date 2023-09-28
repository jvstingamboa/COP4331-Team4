<?php 
    //code to show PHP errors
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
   $inData = getRequestInfo();
   
   $id = $inData["userId"];
   $login = $inData["login"];

   //connecting to the database
   $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
   if( $conn->connect_error )
   {
       returnWithError( $conn->connect_error );
   }
   else
   {
       
       $stmt = $conn->prepare("DELETE FROM USERS WHERE Login=?");
       $stmt->bind_param("s", $inData["login"]);
       $stmt->execute();
       $result = $stmt->get_result();

       if( $row = $result->fetch_assoc() )
       {
            returnWithInfo(true);
       }

       else
       {
            returnWithInfo(false);
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

    function returnWithInfo( $result )
	{
		$retValue = '{"result":' . $result . '}';
		sendResultInfoAsJson( $retValue );
	}

   function returnWithError( $err )
	{
		//$retValue = '{"username":"","firstName":"","lastName":"","password":"","error":"' . $err . '"}';
		$retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
	}
?>