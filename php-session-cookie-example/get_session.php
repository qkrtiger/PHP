<?php
// 세션 시작
session_start();

// 세션 변수 가져오기
$username = isset($_SESSION["username"]) ? $_SESSION["username"] : "세션 값이 없습니다.";
$email = isset($_SESSION["email"]) ? $_SESSION["email"] : "세션 값이 없습니다.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Session</title>
</head>
<body>
    <h1>세션 값:</h1>
    <p>Username: <?php echo $username; ?></p>
    <p>Email: <?php echo $email; ?></p>
    <p><a href="index.php">메인 페이지로 돌아가기</a></p>
</body>
</html>
