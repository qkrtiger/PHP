<?php
// 세션 시작
session_start();

// 세션 모두 삭제
session_unset(); // 세션 변수 초기화
session_destroy(); // 세션 완전히 파기
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Destroy Session</title>
</head>
<body>
    <h1>세션이 삭제되었습니다!</h1>
    <p><a href="index.php">메인 페이지로 돌아가기</a></p>
</body>
</html>
