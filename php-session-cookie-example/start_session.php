<?php
// 세션 시작
session_start();

// 세션 변수 설정
$_SESSION["username"] = "JohnDoe";
$_SESSION["email"] = "johndoe@example.com";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start Session</title>
</head>
<body>
    <h1>세션이 시작되었습니다!</h1>
    <p><a href="index.php">메인 페이지로 돌아가기</a></p>
</body>
</html>
