<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$name=$_POST['name'];
$phone=$_POST['phone'];

$to='yanavoznuk@gmail.com'; //сar.search.сompany@ukr.net
$subject='Заявка на підбір авто';
$message="Контакті данні особи, що цікавиться підбором авто.\nІм'я: ".$name."\n"."Номер телефону:".$phone;

error_reporting(E_ALL);
ini_set('display_errors', '1');

if(mail($to, $subject, $message)){
    echo "<p>Дякуємо, заявку відправленно!</p>";
} else {
    echo "Упс, щось пішло не так! Спробуйте пізніше";
}
?>