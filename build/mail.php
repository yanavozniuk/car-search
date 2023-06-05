<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, FETCH, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access- 
    Control-Allow-Headers, Authorization, X-Requested-With");
    if(isset($_POST['submit'])){
        $name=$_POST['name'];
        $photo=$_POST['phone'];
        
        $to='vozlama@meta.ua'; //сar.search.сompany@ukr.net
        $subject='Заявка на підбір авто';
        $message="Контакті данні особи, що цікавиться підбором авто. Ім/'я: ".$name."\n"."Номер телефону:".$phone;
        $headers = "From: noreply@carsearch-service.com\n";

        if(mail($to, $subject, $message, $headers))
        {
            echo "<h1>Sent success! Thank you"." ".$name."</h1>";
        }
        else{
            echo "Something went wrong!";
        }
    }
?>