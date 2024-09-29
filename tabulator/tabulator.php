<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabulator Example</title>
    <!-- Tabulator CSS 파일을 추가합니다 -->
    <link href="https://unpkg.com/tabulator-tables@5.2.7/dist/css/tabulator.min.css" rel="stylesheet">
</head>
<body>

    <h1>Tabulator Example with PHP</h1>
    <div id="example-table"></div>

    <!-- Tabulator JS 파일을 추가합니다 -->
    <script src="https://unpkg.com/tabulator-tables@5.2.7/dist/js/tabulator.min.js"></script>
    <script>
        // Tabulator 테이블을 설정합니다.
        var table = new Tabulator("#example-table", {
            height: "300px", // 테이블의 높이
            layout: "fitColumns", // 자동으로 열의 크기를 조정
            ajaxURL: "data.php", // 데이터를 가져올 URL
            columns: [ // 테이블의 열을 설정합니다.
                {title: "ID", field: "id", width: 150},
                {title: "Name", field: "name"},
                {title: "Age", field: "age"}
            ]
        });
    </script>
</body>
</html>
