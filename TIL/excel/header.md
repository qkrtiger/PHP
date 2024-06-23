
## header() 함수를 사용한 방법

데이터를 CSV 형식으로 변환하여 다운로드할 때 유용하다.

```php
$filename = "파일이름.xls";

header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=".$filename);
header("Content-Description: PHP4 Generated Data");

// 엑셀 파일로 다운로드할 데이터 출력
echo "데이터1\t데이터2\t데이터3\n";
echo "1\t2\t3\n";
echo "4\t5\t6\n";
```
