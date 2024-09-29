<?php
// 데이터를 생성합니다. 보통은 데이터베이스에서 호출
$data = [
    ["id" => 1, "name" => "John", "age" => 29],
    ["id" => 2, "name" => "Alice", "age" => 24],
    ["id" => 3, "name" => "Bob", "age" => 32]
];

// 데이터를 JSON 형식으로 반환합니다.
header('Content-Type: application/json');
echo json_encode($data);
