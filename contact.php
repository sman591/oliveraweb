<?php

if ($_POST['username']) // most bots will fill this (hidden by CSS) field
  exit;

$name    = $_POST['name'];
$email   = $_POST['email'];
$hosting = $_POST['type'];
$message = $_POST['comments'];

if (trim($name) == '' || trim($email) == '' || trim($message) == '')
  exit;

$content =  "From:  " . $name . "\r\n";
$content .= "Email:  " . $email . "\r\n";
if (trim($hosting) != '')
  $content .= "Hosting:  " . $hosting . "\r\n";
$content .=  "Message:  \r\n" . $message . "\r\n----";

mail('stuart@oliveraweb.com', 'Contact From OliveraWeb.com', $content);

?>