<?php
$data = $_POST;

require_once '../model/user.php';

$user = new user();



// we gaan checken of de gebruikersnaam is ingevuld 
$errors = array();
if (empty($data['username'])) { 
    // er is geen gebruikersnaam ingevuld dus we geven een error
   $errors[] = 'empty_username';
} 

$user->username = htmlspecialchars($data['username']);

if (empty($data['password'])) { 
    // er is geen wachtwoord ingevuld dus we geven een error
   $errors[] = 'empty_password';
}
if (empty($data['confirm_password'])) { 
    // er is geen wachtwoord ingevuld dus we geven een error
   $errors[] = 'empty_confirm_password';
}
// we gaan kijken of het wachtwoord minimaal 8 karakters lang is
if (strlen($data['password']) < 8) { 
    // het wachtwoord is te kort dus we geven een error
   $errors[] = 'password_too_short';
}
// we gaan kijken of de wachtwoorden overeenkomen 
if ($data['password'] != $data['confirm_password']) { 
    // de wachtwoorden komen niet overeen dus we geven een error
   $errors[] = 'passwords_not_match';
}
// we gaan kijken of de gebruikersnaam al bestaat
if ($user->getUsername()->num_rows > 0) { 
    // de gebruikersnaam bestaat al dus we geven een error
   $errors[] = 'username_exists';
}
if (!empty($errors)) { 
    http_response_code(400);
    echo json_encode($errors);
    exit;
}

// er zijn geen errors dus we gaan de het wachtwoord hashen
$user->password = password_hash($data['password'], PASSWORD_DEFAULT);

// we gaan de gebruiker aanmaken 
$result = $user->createUser();

// als er een error is returnen we een error naar het ajax bestand 

if ($result == true) { 
    http_response_code(200); 
}
