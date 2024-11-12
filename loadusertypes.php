
<?php
require "connection.php";

// Query to fetch data from the database (assuming you have an 'id' and 'name' column)
$sql = "SELECT id, name FROM usertype";
$result =Database::search($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = array(
            'label' => $row['name'], // 'label' maps to the name displayed in the dropdown
            'value' => $row['id'],   // 'value' maps to the associated ID
        );
    }
    echo json_encode($data);
} else {
    echo "No data found.";
}

?>
