<?php 

$request = $_POST;

require_once '../model/user.php';

$user = new user();

// we gaan checken of de gebruikersnaam is ingevuld

if ($request['username'] == null) {
    $errors[] = 'empty_username';
} else {
    $user->username = $request['username'];
}

// we gaan checken of het wachtwoord is ingevuld

if ($request['password'] == null) { 
    $errors[] ='empty_password';
} else { 
    $user->username = $request['password'];
}

// als er errors zijn gaan we deze teruggeven
if(!empty($errors)) {
    http_response_code(400);
    echo json_encode($errors);
    exit;
}

// er zijn geen errors dus we gaan kijken of de gebruiker bestaat
?>