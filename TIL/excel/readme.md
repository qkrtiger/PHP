## 1. PHPSpreadsheet 설치
 PHPSpreadsheet는 Composer를 통해 쉽게 설치할 수 있다.
 
 Composer가 설치되어 있지 않다면 Composer 설치를 먼저 진행

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

1. Composer Autoload: PHPSpreadsheet 라이브러리를 사용하기 위해 Composer autoload 파일을 포함시킨다.
2. Spreadsheet 객체 생성: Spreadsheet 객체를 생성하고, getActiveSheet() 메서드를 사용하여 활성 시트를 가져온다.
3. 데이터 추가: 엑셀 시트의 셀에 데이터를 추가
4. 헤더 설정: 엑셀 파일을 브라우저로 출력하기 위해 적절한 헤더를 설정한다.
5. 엑셀 파일 저장: Xlsx 객체를 생성하여 엑셀 파일을 저장. php://output을 사용하여 파일을 브라우저로 출력한다.
6. HTML 폼: 사용자가 엑셀 파일을 다운로드할 수 있는 폼을 작성. 폼이 제출되면 POST 요청이 발생하여 엑셀 파일을 생성하고 다운로드.
