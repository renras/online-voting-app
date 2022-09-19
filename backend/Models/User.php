<?php
class User {
  private $conn;
  private $table = 'users';

  public $id;
  public $username;
  public $password;
  public $is_admin;

  public function __construct($db) {
    $this->conn = $db;
  }

  public function read() {
    $query = 'SELECT * FROM ' . $this->table;

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }

  public function read_single() {
    $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ? LIMIT 0,1';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(1, $this->id);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id = $row['id'];
    $this->username = $row['username'];
    $this->password = $row['password'];
    $this->is_admin = $row['is_admin'];
  }

  public function create() {
    $query = 'INSERT INTO ' . $this->table . ' SET username = :username, password = :password';

    $stmt = $this->conn->prepare($query);

    $this->username = htmlspecialchars(strip_tags($this->username));
    $this->password = htmlspecialchars(strip_tags($this->password));

    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':password', $this->password);

    if($stmt->execute()) {
      return true;
    }

    printf("Error: %s.\n", $stmt->error);

    return false;
  }

  public function update() {
    $query = 'UPDATE ' . $this->table . ' SET username = :username, password = :password WHERE id = :id';

    $stmt = $this->conn->prepare($query);

    $this->username = htmlspecialchars(strip_tags($this->username));
    $this->password = htmlspecialchars(strip_tags($this->password));
    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':id', $this->id);

    if($stmt->execute()) {
      return true;
    }

    printf("Error: %s.\n", $stmt->error);

    return false;
  }

  public function delete() {
    $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

    $stmt = $this->conn->prepare($query);

    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':id', $this->id);

    if($stmt->execute()) {
      return true;
    }

    printf("Error: %s.\n", $stmt->error);

    return false;
  }
}
?>