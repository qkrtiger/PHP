네, GitHub에 올릴 수 있는 PHP의 `str_replace` 함수 사용 예제를 작성해 드리겠습니다.



```php
<?php

// str_replace 함수 예제

// 1. 기본 사용법
$string = "안녕하세요, 세계!";
$search = "세계";
$replace = "PHP";
$result = str_replace($search, $replace, $string);
echo "1. 기본 사용법: " . $result . "\n";

// 2. 대소문자 구분 없이 치환
$string = "HELLO WORLD, hello world";
$search = "hello";
$replace = "Hi";
$result = str_ireplace($search, $replace, $string);
echo "2. 대소문자 구분 없이 치환: " . $result . "\n";

// 3. 여러 문자열 치환
$string = "사과, 바나나, 오렌지";
$search = ["사과", "바나나", "오렌지"];
$replace = ["포도", "키위", "레몬"];
$result = str_replace($search, $replace, $string);
echo "3. 여러 문자열 치환: " . $result . "\n";

// 4. 치환 횟수 카운트
$string = "PHP는 재미있어요. PHP로 코딩하는 것이 좋아요.";
$search = "PHP";
$replace = "Python";
$count = 0;
$result = str_replace($search, $replace, $string, $count);
echo "4. 치환 횟수 카운트: " . $result . "\n";
echo "   치환된 횟수: " . $count . "\n";

// 5. 문자열 배열에서 치환
$strings = ["Hello PHP", "PHP is fun", "Learn PHP"];
$search = "PHP";
$replace = "JavaScript";
$result = str_replace($search, $replace, $strings);
echo "5. 문자열 배열에서 치환:\n";
print_r($result);

?>

