## 1. PHPSpreadsheet 설치
 PHPSpreadsheet는 Composer를 통해 쉽게 설치할 수 있습니다.
 
 Composer가 설치되어 있지 않다면 Composer 설치를 먼저 진행하세요.

```
composer require phpoffice/phpspreadsheet
```

 ## 2. 엑셀 파일 생성 및 다운로드 코드
```php
<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // 데이터 추가 (예제 데이터)
    $sheet->setCellValue('A1', 'Hello');
    $sheet->setCellValue('B1', 'World!');
    $sheet->setCellValue('A2', '엑셀');
    $sheet->setCellValue('B2', '다운로드');

    // 엑셀 파일을 브라우저로 출력하기 위한 설정
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="example.xlsx"');
    header('Cache-Control: max-age=0');

    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>엑셀 다운로드</title>
</head>
<body>
    <form method="post">
        <button type="submit">엑셀 다운로드</button>
    </form>
</body>
</html>
```
