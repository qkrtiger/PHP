

// Custom editor for current column
var currentEditor = function(cell, onRendered, success, cancel) {
    // Create a wrapper div to hold the input and prefix
    var container = document.createElement("div");
    container.style.position = "relative";
    container.style.height = "100%";

    // Create and style input element
    var input = document.createElement("input");
    input.type = "text";
    input.value = cell.getValue() || "";
    input.style.paddingLeft = "20px"; // Add padding to make space for prefix

    // Add prefix to input
    var prefix = document.createElement("span");
    prefix.innerHTML = "±";
    prefix.className = "prefix";

    // Append input and prefix to container
    container.appendChild(input);
    container.appendChild(prefix);

    input.focus();

    // Ensure editor remains focused
    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    // Handle value change
    input.addEventListener("change", function(){
        success(input.value);
    });

    // Handle editor cancellation
    input.addEventListener("blur", function(){
        cancel();
    });

    return container; // Return the container div
};


// Custom editor for pm column with ± sign
var pmEditor = function(cell, onRendered, success, cancel) {
    // Create a wrapper div to hold the input and prefix
    var container = document.createElement("div");
    container.style.position = "relative";
    container.style.height = "100%";

    // Create and style input element
    var input = document.createElement("input");
    input.type = "text";
    input.value = cell.getValue() || "";
    input.style.paddingLeft = "20px"; // Add padding to make space for prefix
    input.style.width = "100%";

    // Add prefix to input
    var prefix = document.createElement("span");
    prefix.innerHTML = "±";
    prefix.style.position = "absolute";
    prefix.style.left = "5px";
    prefix.style.top = "50%";
    prefix.style.transform = "translateY(-50%)";
    prefix.style.pointerEvents = "none"; // Ensure prefix doesn't interfere with input events

    // Append input and prefix to container
    container.appendChild(input);
    container.appendChild(prefix);

    input.focus();

    // Ensure editor remains focused
    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    // Handle value change
    input.addEventListener("change", function(){
        success(input.value);
    });

    // Handle editor cancellation
    input.addEventListener("blur", function(){
        cancel();
    });

    return container; // Return the container div
};

// Cell formatter to add ± sign
var pmFormatter = function(cell, formatterParams) {
    var value = cell.getValue();
    return value !== undefined && value !== null && value !== "" ? "±" + value : "";
};


// 커스텀 날짜 에디터 함수
function dateEditor(cell, onRendered, success, cancel, editorParams){
    var editor = document.createElement("input");
    editor.setAttribute("type", "text");
    var cellValue = cell.getValue();
    
    // daterangepicker 초기화
    $(editor).daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        autoApply: true,
        startDate: cellValue ? moment(cellValue) : moment(),
        locale: {
            format: 'YYYY-MM-DD',
            daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
        }
    });

    // 에디터에 현재 셀 값 설정
    // editor.value = cell.getValue();
    editor.value = cellValue || '';

    // 날짜 선택 시 success 콜백 호출
    $(editor).on('apply.daterangepicker', function(ev, picker) {
        var formattedDate = picker.startDate.format('YYYY-MM-DD');
        editor.value = formattedDate;
        success(formattedDate);
    });

    // 취소 시 cancel 콜백 호출
    $(editor).on('cancel.daterangepicker', function(ev, picker) {
        cancel();
    });

    // 에디터 렌더링
    onRendered(function(){
        editor.focus();
        editor.style.width = "100%";
    });

    return editor;
}


// 편집 불가셀 
var nonEditableFormatter = function(cell, formatterParams) {
    cell.getElement().style.fontSize = "15px"; // Light pink background
    // 글자 두껍게
    cell.getElement().style.fontWeight = "bold";
    // 글자 파란색
    cell.getElement().style.color = "blue";
    return cell.getValue();
};

// 셀 글자 스타일 
var styleFormatter = function(cell, formatterParams) {
    // cell.getElement().style.fontSize = "15px"; // Light pink background
    // 글자 두껍게
    cell.getElement().style.fontWeight = "bold";
    // 글자 파란색
    // cell.getElement().style.color = "blue";
    return cell.getValue();
};

function generateUUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// 파일 업로드 에디터
function fileUploadEditor(cell, onRendered, success, cancel, editorParams){
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    // input.setAttribute("data-eid", "edu_history");

    
    // 현재 행의 unique ID를 가져옵니다.
    var uniqueId = cell.getRow().getData().uniqueId;

    // refseq에 행 인덱스를 추가합니다.
    var eid = 'edu_record' + '_' + uniqueId;
    input.setAttribute("data-refseq", user_seq);

    // var fname = 'f'+user_seq + '_' + 'edu_history';
    // input.classList.add(fname); // 클래스 추가
    
    onRendered(function(){
        input.focus();
        input.style.css = "100%";
    });

    function successFunc(){
        success(input.files[0]);
        // console.log("File uploaded:", input.files[0]);
        var alertyn = 'y';
        var file = input.files[0];
        if (file) {
            var formData = new FormData();
            formData.append("file", file);
            formData.append("refseq", user_seq);
            formData.append("eid", eid);
            formData.append('act', 'chuga');
            
            $.ajax({
                url: '/rams/_api/zf_file.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'json',
                async: true,
                success: function (res) {
                    // json data 처리 json parse
                    // var jdata = JSON.parse(res);
                    // 성공적으로 전송된 후 처리
                    if (res[0].code == '0') {
                        if (alertyn != 'n') {
                            var refseq = user_seq;
                            Swal.fire({
                                icon: 'success',
                                title: '파일 업로드가 완료 되었습니다',
                                showConfirmButton: false,
                                timer: 500,
                            }).then(() => {
                                fileFormatter(cell, refseq, 'edu_record_'+uniqueId);
                            });
                        } 
                    } else if (res[0].code == '10') {
                        Swal.fire({
                            icon: 'error',
                            title: '해당 파일은 저장할 수 없는 확장자입니다.',
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    // 오류 처리
                },
            });
        }
    }

    input.addEventListener("change", successFunc);

    return input;
}


// 파일 표시 포매터
// function fileFormatter(cell, formatterParams, onRendered){
//     var value = cell.getValue();

//     console.log("Formatter value:", value);

//     if (value && Array.isArray(value) && value.length > 0) {
//         var container = document.createElement("div");

//         value.forEach(file => {
//             var link = document.createElement("a");
//             link.setAttribute("href", "javascript:;");
//             link.className = "filedown";
//             link.onclick = function() {
//                 handleFileClick(file.seq, file.file_org, file.file_path, file.file_real, file.file_size);
//             };
//             link.textContent = file.file_org;
//             link.style.display = "block";
//             link.addEventListener("click", function(e){
//                 e.preventDefault();
//                 e.stopPropagation();
//             });
            
            
//             container.appendChild(link);
//         });

//         return container;
//     }

//     return "";
// }

function fileFormatter(cell, formatterParams, onRendered){
    var value = cell.getValue();

    console.log("Formatter value:", value);

    if (value && Array.isArray(value) && value.length > 0) {
        var container = document.createElement("div");

        value.forEach(file => {
            var link = document.createElement("a");
            link.setAttribute("href", "javascript:;");
            link.className = "filedown";
            link.onclick = function() {
                handleFileClick(file.seq, file.file_org, file.file_path, file.file_real, file.file_size);
            };
            link.textContent = file.file_org;
            link.style.display = "block";
            link.style.marginRight = "10px";
            link.addEventListener("click", function(e){
                e.preventDefault();
                e.stopPropagation();
            });

            var button = document.createElement("button");
            button.type = "button";
            button.className = "btn btn-file-del p-0 px-2";
            button.innerHTML = "X";
            button.onclick = function() {
                delFile(file.seq, file.file_org);
            };

            var fileContainer = document.createElement("div");
            fileContainer.appendChild(link);
            fileContainer.appendChild(button);
            fileContainer.style.display = "flex";
            fileContainer.style.alignItems = "center";
            fileContainer.style.marginBottom = "5px";

            container.appendChild(fileContainer);
        });

        return container;
    }

    return "";
}

// 링크 이미지면 보여주고, 그외에는 다운로드
function handleFileClick(seq, file_org, file_path, file_real, file_size) {
    // 파일 확장자 추출
    const fileExtension = file_org.split('.').pop().toLowerCase();

    // 이미지 파일 확장자 리스트
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    const full_file_path = file_path + '/' + file_real;

    const down_link = `/rams/_api/filedown.php?seq=${seq}&file_size=${file_size}`;

    // 이미지 파일인 경우
    if (imageExtensions.includes(fileExtension)) {
        // 이미지를 보여주는 모달을 띄움
        $('#imageModal').find('img').attr('src', full_file_path);
        $('#imageModal').modal('show');

        // .down-link 에 링크 변경
        $('.down-link').attr('href', down_link);
    } else {
        // 이미지 파일이 아닌 경우, 파일 다운로드 링크로 리다이렉트
        window.location.href = down_link;
    }
}


var jobOptions = [
    {label: "안전보건관리책임자", value: "안전보건관리책임자"},
    {label: "안전관리자", value: "안전관리자"},
    {label: "보건관리자", value: "보건관리자"},
    {label: "안전보건담당자", value: "안전보건담당자"}
];

// 파일 데이터 가져오기
function fetchFiles(refseq, act, callback) {
    $.ajax({
        url: 'edu_file.php',
        type: 'POST',
        data: { refseq: refseq, act: act, eid: 'edu_record_' },
        dataType: 'json',
        success: function(response) {
            console.log(response);
            callback(response);
        },
        error: function(xhr, status, error) {
            console.error("파일 데이터를 가져오는 중 오류 발생:", error);
        }
    });
}



// 기존 tableData2와 파일 데이터를 통합하는 함수
// function integrateFileData(tableData, fileData) {
//     // fileData가 null 또는 undefined일 경우 빈 배열로 초기화
//     fileData = fileData || [];
    
//     // tableData의 각 행에 fileData 전체를 추가
    
//     return tableData.map(row => {
//         var checkId = 'edu_record_'+row.uniqueId;
//         return {
//             ...row,
//             file: fileData
//         };
//     });
// }
// function integrateFileData(tableData, fileData) {
//     fileData = fileData || [];
//     return tableData.map(row => {
//         // row의 uniqueId와 일치하는 fileData 항목들을 찾습니다.
//         var checkId = 'edu_record_'+row.uniqueId;
//         console.log(fileData[0].eid);
//         console.log(checkId);
//         const matchingFiles = fileData.filter(file => file.eid == checkId);
//         return {
//             ...row,
//             file: matchingFiles
//         };
//     });
// }
function integrateFileData(tableData, fileData) {
    // fileData가 null 또는 undefined일 경우 빈 배열로 초기화
    fileData = fileData || [];
    
    return tableData.map(row => {
        var checkId = 'edu_record_' + row.uniqueId;
        var matchingFiles = fileData.filter(file => file.file_eid === checkId);
        return {
            ...row,
            file: matchingFiles
        };
    });
}

// Create Tabulator on DOM element with id "example-table1"
var table1 = new Tabulator("#example-table1", {
    height: "300px",
    data: tableData1,
    selectable: 1, // Allow row selection
    layout: "fitColumns", // Fit columns to width of table
    columns: [ // Define table columns
        // {title:"ID", field:"id", width:70, editor:false, maxWidth:100}, // ID column, not editable
        {title: "소속팀", field: "team", editor: "input", maxWidth: 110,}, // Editable columns
        {title: "직무명", field: "job_name", editor: "input", maxWidth: 125}, // Use custom editor
        {title: "직무 변경일자", field: "change_date", editor: dateEditor, formatter: function(cell, formatterParams){
            var value = cell.getValue();
            cell.getElement().style.fontWeight = "bold";
            if(value){
                var date = moment(value, "YYYY-MM-DD", true);
                return date.isValid() ? date.format("YYYY-MM-DD") : "";
            }
            return "";
        }, maxWidth: 125},
        {title: "안전보건직무", field: "minCurrent", editor:"select", editorParams: {values: jobOptions}, maxWidth: 130},
        {title: "신규 교육일자", field: "new_date", editor: dateEditor, formatter: function(cell, formatterParams){
            var value = cell.getValue();
            cell.getElement().style.fontWeight = "bold";
            if(value){
                var date = moment(value, "YYYY-MM-DD", true);
                return date.isValid() ? date.format("YYYY-MM-DD") : "";
            }
            return "";
        }, maxWidth: 125},
        {title: "최근 보수 교육일자", field: "last_date", editor: dateEditor, formatter: function(cell, formatterParams){
            var value = cell.getValue();
            cell.getElement().style.fontWeight = "bold";
            if(value){
                var date = moment(value, "YYYY-MM-DD", true);
                return date.isValid() ? date.format("YYYY-MM-DD") : "";
            }
            return "";
        }, maxWidth: 160},
    ]
});



table1.on("cellEdited", function(cell) {
    // Get the row data
    var row = cell.getRow();
    var data = row.getData();

    // Check if both current and pm have values
    if (data.current !== undefined && data.pm !== undefined) {
        var current = parseFloat(data.current);
        var pm = parseFloat(data.pm);

        if (!isNaN(current) && !isNaN(pm)) {
            // Calculate min and max current
            var minCurrent = current - pm;
            var maxCurrent = current + pm;

            // Update the row with the new values
            row.update({
                minCurrent: minCurrent,
                maxCurrent: maxCurrent
            });

            console.log("Updated minCurrent:", minCurrent, "maxCurrent:", maxCurrent);
        } else {
            console.log("Invalid number: current or pm is NaN");
        }
    } else {
        console.log("Current or pm is undefined");
    }
});


// Create Tabulator on DOM element with id "example-table2"
// tableData2에 대한 파일 데이터를 가져와서 통합한 후 Tabulator를 초기화
var table2;
fetchFiles(user_seq, 'list', function(fileData) {
    var integratedData = integrateFileData(tableData2, fileData);

    console.log(integratedData);

    // 각 행에 unique ID 추가
    integratedData = integratedData.map(row => {
        if (row.uniqueId) {
            console.log("Row already has uniqueId:", row.uniqueId);
            // 이미 uniqueId가 있으면 그대로 사용
            return row;
        } else {
            // uniqueId가 없으면 새로 생성
            return {...row, uniqueId: generateUUID()};
        }
    });

    // console.table(integratedData);
    console.log(integratedData);

    table2 = new Tabulator("#example-table2", {
        height:"300px",
        data:integratedData ,
        selectable:1, // Allow row selection
        layout: "fitData",
        layout:"fitColumns", // Fit columns to width of table
        columns:[ // Define table columns
            {title:"자격증 종류", field:"license", width:150, editor:"input", maxWidth:150 }, // ID column, not editable
            {title: "취득일자", field: "get_date", editor: dateEditor, formatter: function(cell, formatterParams){
                var value = cell.getValue();
                cell.getElement().style.fontWeight = "bold";
                if(value){
                    var date = moment(value, "YYYY-MM-DD", true);
                    return date.isValid() ? date.format("YYYY-MM-DD") : "";
                }
                return "";
            }, maxWidth: 150},
            {title: "유효기간", field: "ex_date", editor: dateEditor, formatter: function(cell, formatterParams){
                var value = cell.getValue();
                cell.getElement().style.fontWeight = "bold";
                if(value){
                    var date = moment(value, "YYYY-MM-DD", true);
                    return date.isValid() ? date.format("YYYY-MM-DD") : "";
                }
                return "";
            }, maxWidth: 150},
            
            {title:"발행처", field:"issuer", editor:"input",  maxWidth:150}, // Editable columns
            {title:"첨부", field:"file", editor:fileUploadEditor, formatter:fileFormatter, maxWidth:200, headerSort:false},
        ],
    });


    table2.on("cellEdited", function(cell) {

        var row = cell.getRow();
        var data = row.getData();

        // Check if both minTemp and maxTemp have values
        if (data.minTemp !== undefined && data.maxTemp !== undefined) {
            var minTemp = data.minTemp;
            var maxTemp = data.maxTemp;

            // Update the "temperature" field with the combined value
            var temperature = minTemp + "-" + maxTemp;

            // Update the row with the new temperature value
            row.update({
                temperature: temperature
            });

            console.log("Updated temperature:", temperature);
        } else {
            console.log("minTemp or maxTemp is undefined");
        }
    });
});

var table3;
fetchFiles(user_seq, 'list', function(fileData) {

    var integratedData = integrateFileData(tableData3, fileData);

    table3 = new Tabulator("#example-table3", {
        height: "300px",
        data: integratedData,
        layout: "fitColumns", // Fit columns to width of table
        columns: [ // Define table columns
            {title: "교육일자", field: "edu_date"},
            {title: "교육구분", field: "edu_div"},
            {title: "교육방법", field: "edu_method"},
            {title: "법정교육명", field: "edu_course"},
            {title: "교육명", field: "edu_course"},
            {title: "교육시간", field: "edu_time"},
            {title: "이수시간", field: "edu_complete"},
            {title: "평가", field: "edu_rating"},
            {title: "첨부", field: "file_list" , headerSort:false}
        ]
    });


});
// Function to add a row to Table 1
function addRowToTable1() {
    table1.addRow({});
}

// Function to delete a selected row from Table 1
function deleteRowFromTable1() {
    var selectedRows = table1.getSelectedRows(); // Get array of selected rows
    if(selectedRows.length) {
        selectedRows[0].delete(); // Delete the first selected row
    } else {
        alert("삭제 할 행을 선택해 주세요");
    }
}


// Function to add a row to Table 2
function addRowToTable2() {
    // table2.addRow({});
    table2.addRow({uniqueId: generateUUID()});
    
}

// Function to delete a selected row from Table 2
function deleteRowFromTable2() {
    var selectedRows = table2.getSelectedRows(); // Get array of selected rows
    if(selectedRows.length) {
        selectedRows[0].delete(); // Delete the first selected row
    } else {
        alert("삭제 할 행을 선택해 주세요");
    }
}



