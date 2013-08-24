<?php

$spam = $_POST['username'];
if ($_POST['username'])
  exit;

$name    = $_POST['name'];
$email   = $_POST['email'];
$hosting = $_POST['type'];
$message = $_POST['comments'];

if (trim($name) == '' || trim($email) == '' || trim($message) == '')
  exit;

$content = "From:  " . $name . "\r\n";
$content .= "Email:  " . $email . "\r\n";
if (trim($hosting) != '')
  $content .= "Hosting:  " . $hosting . "\r\n";
$content .= "Message:  \r\n" . $message . "\r\n----";

mail('stuart@oliveraweb.com', 'Contact From OliveraWeb.com', $content);

?>