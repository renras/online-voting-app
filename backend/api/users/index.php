<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once('../../Config/Database.php');
require_once('../../Models/User.php');

// get request
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $database = new Database();
    $db = $database->connect();

    $user = new User($db);
    $result = $user->read();
    $num = $result->rowCount();

    if($num > 0) {
        $users_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $user_item = array(
                'id' => $id,
                'username' => $username,
                'password' => $password,
            );

            array_push($users_arr, $user_item);
        }

        echo json_encode($users_arr);
    } else {
        echo json_encode(
            array('message' => 'No Users Found')
        );
    }
}

// post request

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"));

    $user->username = $data->username;
    $user->password = $data->password;

    if($user->create()) {
        echo json_encode(
            array('message' => 'User Created')
        );
    } else {
        echo json_encode(
            array('message' => 'User Not Created')
        );
    }
}

// put request
if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"));

    $user->id = $data->id;
    $user->username = $data->username;
    $user->password = $data->password;

    if($user->update()) {
        echo json_encode(
            array('message' => 'User Updated')
        );
    } else {
        echo json_encode(
            array('message' => 'User Not Updated')
        );
    }
}

// delete request
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"));

    $user->id = $data->id;

    if($user->delete()) {
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