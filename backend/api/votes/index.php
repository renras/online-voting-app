<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once('../../Config/Database.php');
require_once('../../Models/Vote.php');

// get request
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $database = new Database();
    $db = $database->connect();

    $vote = new Vote($db);
    $result = $vote->read();
    $num = $result->rowCount();

    if($num > 0) {
        $votes_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $vote_item = array(
                'id' => $id,
                'user_id' => $user_id,
                'position_id' => $position_id
            );

            array_push($votes_arr, $vote_item);
        }

        echo json_encode($votes_arr);
    } else {
        echo json_encode(
            array('message' => 'No Votes Found')
        );
    }
}

// post request
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $database = new Database();
    $db = $database->connect();

    $vote = new Vote($db);

    $data = json_decode(file_get_contents("php://input"));

    $vote->user_id = $data->user_id;
    $vote->position_id = $data->position_id;

    if($vote->create()) {
        echo json_encode(
            array('message' => 'Vote Created')
        );
    } else {
        echo json_encode(
            array('message' => 'Vote Not Created')
        );
    }
}

// put request
if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $database = new Database();
    $db = $database->connect();

    $vote = new Vote($db);

    $data = json_decode(file_get_contents("php://input"));

    $vote->id = $data->id;
    $vote->user_id = $data->user_id;
    $vote->position_id = $data->position_id;

    if($vote->update()) {
        echo json_encode(
            array('message' => 'Vote Updated')
        );
    } else {
        echo json_encode(
            array('message' => 'Vote Not Updated')
        );
    }
}

// delete request
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $database = new Database();
    $db = $database->connect();

    $vote = new Vote($db);

    $data = json_decode(file_get_contents("php://input"));

    $vote->id = $data->id;

    if($vote->delete()) {
        echo json_encode(
            array('message' => 'Vote Deleted')
        );
    } else {
        echo json_encode(
            array('message' => 'Vote Not Deleted')
        );
    }
}
?>