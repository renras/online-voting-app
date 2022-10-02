<?php 
  class Database {
    // DB Params
    private $host = 'localhost';
    private $db_name = 'id19656078_ova_api';
    private $username = 'id19656078_root';
    private $password = '0ri?7zU*6}xM]iMv';
    private $conn;

    // DB Connect
    public function connect() {
      $this->conn = null;

      try { 
        $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch(PDOException $e) {
        echo 'Connection Error: ' . $e->getMessage();
      }

      return $this->conn;
    }
  }