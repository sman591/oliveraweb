<?php

$spam = $_POST['username'];
if ($_POST['username'])
  exit;

$name    = $_POST['name'];
$email   = $_POST['email'];
$message = $_POST['comments'];

if (trim($name) == '' || trim($email) == '' || trim($message) == '')
  exit;

$content = "From:  " . $name . "\r\n";
$content .= "Email:  " . $email . "\r\n";
$content .= "Message:  \r\n" . $message . "\r\n----";

mail('test@oweb.co', 'Contact From OliveraWeb.com', $content);

?>