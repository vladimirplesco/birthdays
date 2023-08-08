<?php
 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
 
//require 'vendor/autoload.php';
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';
include_once "notice.php"; 
echo ('mail_sender');
if (strlen($body) > 49) {
$mail = new PHPMailer(true);
 
try {
    $mail->SMTPDebug = 2;                                      
    $mail->isSMTP();                                           
    $mail->Host       = 'smtp.gmail.com';                   
    $mail->SMTPAuth   = true;                            
    $mail->Username   = 'vladimir.plesco@gmail.com';                
    $mail->Password   = 'kututoszflclztje';                       
    $mail->SMTPSecure = 'tls';                             
    $mail->Port       = 587;
    $mail->CharSet = "UTF-8";
    $mail->Encoding = 'base64'; 
 
    $mail->setFrom('vladimir.plesco@gmail.com', 'Vladimir');          
    $mail->addAddress('vladimir.plesco@gmail.com');
    $mail->addAddress('pleshco@deeplace.md', 'Vladimir');
    // $mail->addAddress('alla_plesco@mail.ru', 'Alla');
    // $mail->addAddress('info@geshov.ru', 'Alecsandr');
    // $mail->addAddress('elena.v.plesco@gmail.com', 'Elena');  
    $mail->isHTML(true);                                 
    $mail->Subject = 'Subject';
    // $mail->Body    = 'HTML message body in <b>bold</b> ';
    $mail->Body    = $body;
    $mail->AltBody = 'Body in plain text for non-HTML mail clients';
    $mail->send();
    echo "Mail has been sent successfully!";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
}
 
?>