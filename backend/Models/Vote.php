<?php 
class Vote {  
  private $conn;
  private $table = 'votes';

  public $id;
  public $user_id;
  public $position_id;

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
    $this->user_id = $row['user_id'];
    $this->position_id = $row['position_id'];
  }

  public function create() {
    $query = 'INSERT INTO ' . $this->table . ' SET user_id = :user_id, position_id = :position_id';

    $stmt = $this->conn->prepare($query);

    $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    $this->position_id = htmlspecialchars(strip_tags($this->position_id));

    $stmt->bindParam(':user_id', $this->user_id);
    $stmt->bindParam(':position_id', $this->position_id);

    if($stmt->execute()) {
      return true;
    }

    printf("Error: %s.\n", $stmt->error);

    return false;
  }

  public function update() {
    $query = 'UPDATE ' . $this->table . ' SET user_id = :user_id, position_id = :position_id WHERE id = :id';

    $stmt = $this->conn->prepare($query);

    $this->id = htmlspecialchars(strip_tags($this->id));
    $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    $this->position_id = htmlspecialchars(strip_tags($this->position_id));

    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':user_id', $this->user_id);
    $stmt->bindParam(':position_id', $this->position_id);

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