<?php
if (isset($_GET['file'])) {
    $file = basename($_GET['file']);
    $filePath = __DIR__ . '/uploads/' . $file;

    if (file_exists($filePath)) {
        unlink($filePath); // 파일 삭제
        echo "File deleted successfully.";
    } else {
        echo "File not found.";
    }
    header("Location: index.php");
    exit;
}
