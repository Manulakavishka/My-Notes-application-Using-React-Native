<?php

$createNoteData = json_decode(file_get_contents("php://input"));

$mo = $createNoteData->mobile;
$category = $createNoteData->category;
$title = $createNoteData->title;
$description = $createNoteData->description;

$noteData = new stdClass();


require "connection.php";

        Database::iud("INSERT INTO `notes` (`title`,`des`,`categoryid`,`userid`,`date_time`) 
        VALUES ('" . $title . "','" . $description . "','" . $category . "','" .$mo . "',CURRENT_TIMESTAMP())");
     $noteData->status = "success";

echo json_encode($noteData);




?>