<?php 
class Vote {  
  private $conn;
  private $table = 'votes';

  public $id;
  public $candidate_id;
  public $position_id;
  public $voter_id;

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
    $this->candidate_id = $row['candidate_id'];
    $this->position_id = $row['position_id'];
    $this->voter_id = $row['voter_id'];
  }

  public function create() {
    $query = 'INSERT INTO ' . $this->table . ' SET candidate_id = :candidate_id, position_id = :position_id, voter_id = :voter_id';

    $stmt = $this->conn->prepare($query);

    $this->candidate_id = htmlspecialchars(strip_tags($this->candidate_id));
    $this->position_id = htmlspecialchars(strip_tags($this->position_id));

    $stmt->bindParam(':candidate_id', $this->candidate_id);
    $stmt->bindParam(':position_id', $this->position_id);
    $stmt->bindParam(':voter_id', $this->voter_id);

    if($stmt->execute()) {
      return true;
    }

    printf("Error: %s.\n", $stmt->error);

    return false;
  }

  public function update() {
    $query = 'UPDATE ' . $this->table . ' SET candidate_id = :candidate_id, position_id = :position_id, voter_id = :voter_id WHERE id = :id';

    $stmt = $this->conn->prepare($query);

    $this->id = htmlspecialchars(strip_tags($this->id));
    $this->candidate_id = htmlspecialchars(strip_tags($this->candidate_id));
    $this->position_id = htmlspecialchars(strip_tags($this->position_id));
    $this->vote_id = htmlspecialchars(strip_tags($this->vote_id));

    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':candidate_id', $this->candidate_id);
    $stmt->bindParam(':position_id', $this->position_id);
    $stmt->bindParam(':voter_id', $this->voter_id);

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