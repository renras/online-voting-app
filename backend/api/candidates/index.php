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
                'position' => $position,
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

// post request
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $database = new Database();
    $db = $database->connect();

    $candidate = new Candidate($db);

    $data = json_decode(file_get_contents("php://input"));

    $candidate->name = $data->name;
    $candidate->photo = $data->photo;
    $candidate->position = $data->position;

    if($candidate->create()) {
        echo json_encode(
            array('message' => 'Candidate Created')
        );
    } else {
        echo json_encode(
            array('message' => 'Candidate Not Created')
        );
    }
}

// put request
if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $database = new Database();
    $db = $database->connect();

    $candidate = new Candidate($db);
    $data = json_decode(file_get_contents("php://input"));

    $candidate->id = $data->id;
    $candidate->name = $data->name;
    $candidate->photo = $data->photo;
    $candidate->position = $data->position;

    if($candidate->update()) {
        echo json_encode(
            array('message' => 'Candidate Updated')
        );
    } else {
        echo json_encode(
            array('message' => 'Candidate Not Updated')
        );
    }
}

// delete request
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $database = new Database();
    $db = $database->connect();

    $candidate = new Candidate($db);

    $data = json_decode(file_get_contents("php://input"));

    $candidate->id = $data->id;

    if($candidate->delete()) {
        echo json_encode(
            array('message' => 'User Deleted')
        );
    } else {
        echo json_encode(
            array('message' => 'User Not Deleted')
        );
    }
}
?>


