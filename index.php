 <?php
  // Initialize the session
  session_start();
  require 'autoloader.php';

  // Get URI and remove base path
  $_GET['basepath'] = dirname($_SERVER['PHP_SELF']);
  if ($_GET['basepath'] == "/" || $_GET['basepath'] == "\\") {
    $_GET['basepath'] = "";
  }
  $_GET['imgpath'] = dirname(dirname($_SERVER['PHP_SELF']));
  $uri = substr($_SERVER['REQUEST_URI'], strlen($_GET['basepath']));

  // Check for query
  if (strstr($uri, '?')) {
    // remove querystring
    $uri = substr($uri, 0, strpos($uri, '?'));
  }

  // separate URI
  $params = explode("/", trim($uri, "/"));

  // walk through params
  foreach ($params as $key => $value) {
    $_GET['v' . $key] = trim($value);
  }


  // select page based on parameter
  switch ($_GET['v0']) {
    case 'register':
      include_once 'view/register.html';
      break;
    default:
      include_once 'view/login.html';
  }
  ?>