<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = __DIR__ . '/uploads/';
    $fileName = basename($_FILES['file']['name']);
    $targetFile = $uploadDir . $fileName;

    // 업로드 디렉토리가 없으면 생성
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // 파일 이동
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        echo "File uploaded successfully.";
        header("Location: index.php");
        exit;
    } else {
        echo "Failed to upload file.";
    }
}
