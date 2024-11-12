<?php
$viewData = json_decode(file_get_contents("php://input"));

$mo = $viewData->mobile;
require "connection.php";

// Query to retrieve data from the database
$sql = "SELECT * FROM notes n INNER JOIN catagory c ON n.categoryid=c.id WHERE userid= '".$mo."'";
$result = Database::search($sql);

// Fetch data as an associative array
$sampleNotes = [];
while ($row = $result->fetch_assoc()) {
    $sampleNotes[] = $row;
}

// Send the data as a JSON response
header("Content-Type: application/json");
echo json_encode($sampleNotes);

?>
