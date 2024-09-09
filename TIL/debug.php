
// 디버깅이 필요할 때 txt파일에 데이터를 출력
$log = date('Y-m-d H:i:s') . " : " . $check_query . "\n";
file_put_contents('log.txt', $log, FILE_APPEND);
