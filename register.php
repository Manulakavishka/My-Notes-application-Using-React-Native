<?php

$registrationData = json_decode(file_get_contents("php://input"));

$mo = $registrationData->number1;
$fname = $registrationData->firstName;
$lname = $registrationData->lastName;
$usertype = $registrationData->userType;
$pass = $registrationData->password;

$userRegi = new stdClass();


require "connection.php";
    $r = Database::search("SELECT * FROM `user` WHERE `mobile` = '" . $registrationData->number1 . "'");
    $n = $r->num_rows;

    if ($n > 0) {
        $userRegi->status = "User With The same Mobile Number Already Exists";
    } else {


        Database::iud("INSERT INTO `user` (`fname`,`lname`,`password`,`mobile`,`usertypeid`) 
        VALUES ('" . $registrationData->firstName . "','" . $registrationData->lastName . "','" . $registrationData->password . "','" .$registrationData->number1 . "','" . $registrationData->userType. "')");
     $userRegi->status = "success";

echo json_encode($userRegi);




}


?>