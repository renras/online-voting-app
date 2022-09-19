<?php
Class Candidate {
  private $conn;
private $table = 'candidates';

public $id;
public $name;
public $photo;
public $position;
public $votes;

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
  $this->name = $row['name'];
  $this->photo = $row['photo'];
  $this->position = $row['position'];
  $this->votes = $row['votes'];
}

public function create() {
  $query = 'INSERT INTO ' . $this->table . ' SET name = :name, photo = :photo, position = :position';

  $stmt = $this->conn->prepare($query);

  $this->name = htmlspecialchars(strip_tags($this->name));
  $this->photo = htmlspecialchars(strip_tags($this->photo));
  $this->position = htmlspecialchars(strip_tags($this->position));


  $stmt->bindParam(':name', $this->name);
  $stmt->bindParam(':photo', $this->photo);
  $stmt->bindParam(':position', $this->position);

  if($stmt->execute()) {
    return true;
  }

  printf("Error: %s.\n", $stmt->error);

  return false;
}

public function update() {
  $query = 'UPDATE ' . $this->table . ' SET name = :name, photo = :photo, position = :position WHERE id = :id';

  $stmt = $this->conn->prepare($query);

  $this->name = htmlspecialchars(strip_tags($this->name));
  $this->photo = htmlspecialchars(strip_tags($this->photo));
  $this->position = htmlspecialchars(strip_tags($this->position));
  $this->id = htmlspecialchars(strip_tags($this->id));

  $stmt->bindParam(':name', $this->name);
  $stmt->bindParam(':photo', $this->photo);
  $stmt->bindParam(':position', $this->position);
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