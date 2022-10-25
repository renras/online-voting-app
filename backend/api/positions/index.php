<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once('../../Config/Database.php');
require_once('../../Models/Position.php');

// get request
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $database = new Database();
    $db = $database->connect();

    $position = new Position($db);
    $result = $position->read();
    $num = $result->rowCount();

    if($num > 0) {
        $positions_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $position_item = array(
                'id' => $id,
                'name' => $name
            );

            array_push($positions_arr, $position_item);
        }

        echo json_encode($positions_arr);
    } else {
        echo json_encode(
            array('message' => 'No Positions Found')
        );
    }
}

// post request
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $database = new Database();
    $db = $database->connect();

    $position = new Position($db);
    $data = json_decode(file_get_contents("php://input"));

    $position->name = $data->name;

    if($position->create()) {
        echo json_encode(
            array('message' => 'Position Created')
        );
    } else {
        echo json_encode(
            array('message' => 'Position Not Created')
        );
    }
}

// put request
if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $database = new Database();
    $db = $database->connect();

    $position = new Position($db);

    $data = json_decode(file_get_contents("php://input"));

    $position->id = $data->id;
    $position->name = $data->name;

    if($position->update()) {
        echo json_encode(
            array('message' => 'Position Updated')
        );
    } else {
        echo json_encode(
            array('message' => 'Position Not Updated')
        );
    }
}

// delete request
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $database = new Database();
    $db = $database->connect();

    $position = new Position($db);

    $data = json_decode(file_get_contents("php://input"));

    $position->id = $data->id;

    if($position->delete()) {
        echo json_encode(
            array('message' => 'Position Deleted')
        );
    } else {
        echo json_encode(
            array('message' => 'Position Not Deleted')
        );
    }
}
?>