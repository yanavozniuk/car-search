<?php
header('Content-type: application/json');
$name=$_POST['name'];
$phone=$_POST['phone'];

$to='yanavoznuk@gmail.com'; //сar.search.сompany@ukr.net
$subject='Заявка на підбір авто';
$message="Контакті данні особи, що цікавиться підбором авто.\nІм'я: ".$name."\n"."Номер телефону: ".$phone;

$send = mail($to, $subject, $message);

if($send){
    http_response_code(200);
    echo json_encode('the response you want to return'); 
} else {
    http_response_code(400);
    echo json_encode('error'); 
}


