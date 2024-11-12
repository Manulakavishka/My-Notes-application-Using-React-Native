<?php

$loginDetails = json_decode(file_get_contents("php://input"));

$user = new stdClass();
require "connection.php";
    $resultset =  Database::search("SELECT * FROM `user` WHERE `mobile` = '" .$loginDetails->number1. "' AND `password` = '" . $loginDetails->password . "'");

    $n = $resultset->num_rows;

    if ($n == 1) {

       $user->status = "success";
       $user->mobile = $loginDetails->number1;
       $user->password =  $loginDetails->password;
        
    } else {
     $user->status = "Invalid Email Or Password";
   $user->mobile = "none";
       $user->password =  "none";
    }


echo json_encode($user);



?>