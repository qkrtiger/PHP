

## 1. 배열의 종류

#### 인덱스 배열
순차적인 숫자 인덱스를 사용하는 배열
```
$fruits = array("Apple", "Banana", "Orange");
```

#### 연관 배열
문자열 키를 사용하는 배열
```
$ages = array("Peter" => 35, "Ben" => 37, "Joe" => 43);
```

#### 다차원 배열
배열 안에 배열이 포함된 구조
```
$employees = array(
    array("name" => "John", "age" => 30),
    array("name" => "Jane", "age" => 25)
);
```

## 2. 배열 함수

#### 배열의 길이 구하기
```
echo count($fruits); // 3
```

#### 배열에 요소 추가
```
$fruits[] = "Grapes";
$ages["Paul"] = 28;
```

#### 배열 요소 제거
```
unset($fruits[1]);
unset($ages["Ben"]);
```

#### 배열 순회
```
// 인덱스 배열
foreach ($fruits as $fruit) {
    echo $fruit . "\n";
}

// 연관 배열
foreach ($ages as $name => $age) {
    echo "$name is $age years old.\n";
}
```

#### 배열 정렬
```
sort($fruits); // 인덱스 배열 오름차순 정렬
asort($ages); // 연관 배열 값 기준 오름차순 정렬
ksort($ages); // 연관 배열 키 기준 오름차순 정렬
```

## 3. 유용한 배열 함수

#### 배열의 합 구하기
```
$numbers = array(1, 2, 3, 4);
$sum = array_sum($numbers); // 10
```

#### 배열 키 존재 여부 확인
```
if (array_key_exists("John", $ages)) {
    echo "John is in the array.";
}
```


#### 배열 값 존재 여부 확인
```
if (in_array("Apple", $fruits)) {
    echo "Apple is in the array.";
}
```

#### 배열 필터링
```
$evenNumbers = array_filter($numbers, function($num) {
    return $num % 2 == 0;
});
```

