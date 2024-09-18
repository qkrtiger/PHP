<?php
// 쿠키 읽기
$cookie_name = "name";
$cookie_value = isset($_COOKIE[$cookie_name]) ? $_COOKIE[$cookie_name] : "쿠키가 설정되지 않았습니다.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Cookie</title>
</head>
<body>
    <h1>쿠키 값:</h1>
    <p><?php echo $cookie_value; ?></p>
    <p><a href="index.php">메인 페이지로 돌아가기</a></p>
</body>
</html>
