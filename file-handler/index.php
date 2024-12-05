<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP File Handler</title>
</head>
<body>
    <h1>File Upload Example</h1>

    <!-- 파일 업로드 폼 -->
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <label for="file">Choose a file:</label>
        <input type="file" name="file" id="file" required>
        <button type="submit">Upload</button>
    </form>

    <h2>Uploaded Files</h2>
    <ul>
        <?php
        $files = array_diff(scandir(__DIR__ . '/uploads'), ['.', '..']);
        foreach ($files as $file): ?>
            <li>
                <?php echo htmlspecialchars($file); ?>
                <a href="uploads/<?php echo urlencode($file); ?>" download>Download</a>
                <a href="delete.php?file=<?php echo urlencode($file); ?>">Delete</a>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
