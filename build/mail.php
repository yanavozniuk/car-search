<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$name=$_POST['name'];
$phone=$_POST['phone'];

$to='сar.search.сompany@ukr.net';
$subject='Заявка на підбір авто';
$message="Контакті данні особи, що цікавиться підбором авто.\nІм'я: ".$name."\n"."Номер телефону:".$phone;

$send = mail($to, $subject, $message);

if($send){
    http_response_code(200);
} else {
    http_response_code(400);
}
?>