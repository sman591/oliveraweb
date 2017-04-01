<?php

if ($_POST['username']) // most bots will fill this (hidden by CSS) field
  exit;

$name    = $_POST['name'];
$email   = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['comments'];

if (trim($name) == '' || trim($email) == '' || trim($message) == '')
  exit;

$content =  "From:  " . $name . "\r\n";
$content .= "Email:  " . $email . "\r\n";
if (trim($subject) != '')
  $content .= "Subject:  " . $subject . "\r\n";
$content .=  "Message:  \r\n" . $message . "\r\n----";


require 'vendor/autoload.php';

use SparkPost\SparkPost;
use GuzzleHttp\Client;
use Http\Adapter\Guzzle6\Client as GuzzleAdapter;

$httpClient = new GuzzleAdapter(new Client());
$sparky = new SparkPost($httpClient, ['key'=>$_ENV['SPARKPOST_KEY']]);
$sparky->setOptions(['async' => false]);

$promise = $sparky->transmissions->post([
    'content' => [
        'from' => [
            'name' => 'Olivera Web',
            'email' => 'hello@oliveraweb.com',
        ],
        'subject' => 'Contact From ' . $_SERVER['HTTP_HOST'],
        'text' => $content,
    ],
    'substitution_data' => ['name' => 'YOUR_FIRST_NAME'],
    'recipients' => [
        [
            'address' => [
                'name' => 'Stuart Olivera',
                'email' => 'stuart@oliveraweb.com',
            ],
        ],
    ],
]);

?>
