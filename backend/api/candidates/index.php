<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once('../../Config/Database.php');
require_once('../../Models/Candidate.php');

// get request
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $database = new Database();
    $db = $database->connect();

    $candidate = new Candidate($db);
    $result = $candidate->read();
    $num = $result->rowCount();

    if($num > 0) {
        $candidates_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $candidate_item = array(
                'id' => $id,
                'name' => $name,
                'photo' => $photo,
                'position' => $position
            );

            array_push($candidates_arr, $candidate_item);
        }

        echo json_encode($candidates_arr);
    } else {
        echo json_encode(
            array('message' => 'No Candidates Found')
        );
    }
}

?>