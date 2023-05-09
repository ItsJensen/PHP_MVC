<?php 

include_once 'database.php';

class user extends database { 
    
public database $db;
public $username;
public $password;


function __construct() {
    $this->db = new database();
}

public function getUsername() { 
    $query = "SELECT `name` FROM `test` WHERE `name` = ?";
    $result = $this->db->execute($query, [$this->username]);
    return $result;
}

public function createUser() { 
    $result = $this->db->insert("test", ["name" => $this->username, "password" => $this->password]); 
    if ($result->affected_rows > 0) { 
        // er is een gebruiker aangemaakt
        return true;
    } else { 
        return false;
    }
}



}





?> 