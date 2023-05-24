<?php 
    if(isset($_POST['submit'])){
        $name=$_POST['name'];
        $email=$_POST['phone'];
        
        $to='yanavoznuk@gmail.com'; //сar.search.сompany@ukr.net
        $subject='Заявка на підбір авто';
        $message="Контакті данні особи, що цікавиться підбором авто. Ім/'я: ".$name."\n"."Номер телефону:".$phone;
        $headers="Заявка на зворотній зв/'язок з сайту сar.search";
        if(mail($to, $subject, $message, $headers))
        {
            echo "<h1>Sent success! Thank you"." ".$name."</h1>";
        }
        else{
            echo "Something went wrong!";
        }
    }
?>