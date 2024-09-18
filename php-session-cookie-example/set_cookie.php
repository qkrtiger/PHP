<?php
// 쿠키 설정하기: name 쿠키에 "John Doe" 값을 설정하고 유효기간을 1시간으로 설정
setcookie("name", "John Doe", time() + 3600, "/"); // "/"는 사이트 전체에서 유효
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Cookie</title>
</head>
<body>
    <h1>쿠키가 설정되었습니다!</h1>
    <p><a href="index.php">메인 페이지로 돌아가기</a></p>
</body>
</html>
