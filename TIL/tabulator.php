
<link rel="stylesheet" href="https://unpkg.com/tabulator-tables@5.4.4/dist/css/tabulator.min.css">

<!-- -----------------------------------------------------------------------------
 ******************************* tabulator 설정 ******************************
 --------------------------------------------------------------------------------->
 
 
<script src="https://unpkg.com/tabulator-tables@5.4.4/dist/js/tabulator.min.js"></script>
    <script>
        // Define table data for 전류
        // var tableData1 = <?=$row['json_process_current']?>;
		var tableData1 = [
            {process: "공정1", current: "10A", pm: "±0.5", minCurrent: "9.5A", maxCurrent: "10.5A"},
            {process: "공정2", current: "20A", pm: "±1", minCurrent: "19A", maxCurrent: "21A"},
            {process: "공정3", current: "15A", pm: "±0.75", minCurrent: "14.25A", maxCurrent: "15.75A"},
            {process: "공정4", current: "25A", pm: "±1.25", minCurrent: "23.75A", maxCurrent: "26.25A"},
            {process: "공정5", current: "30A", pm: "±1.5", minCurrent: "28.5A", maxCurrent: "31.5A"},
        ];

        // Define table data for 온도 1~10 (1외에 공란)
        // var tableData2 = <?=$row['json_reflow_temperature']?>;
		var tableData2 = [
            {id: "공정1", minTemp: "10A", maxTemp: "±0.5", minCurrent: "9.5A", maxCurrent: "10.5A"},
            {id: "공정2", minTemp: "20A", maxTemp: "±1", minCurrent: "19A", maxCurrent: "21A"},
            {id: "공정3", minTemp: "15A", maxTemp: "±0.75", minCurrent: "14.25A", maxCurrent: "15.75A"},
            {id: "공정4", minTemp: "25A", pmaxTempm: "±1.25", minCurrent: "23.75A", maxCurrent: "26.25A"},
            {id: "공정5", minTemp: "30A", maxTemp: "±1.5", minCurrent: "28.5A", maxCurrent: "31.5A"},
        ];

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


		// 달력 
		var dateRangeEditor = function(cell, onRendered, success, cancel){
            var cellValue = cell.getValue();

            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("style", "width:100%; height:100%;");

            input.value = cellValue;

            onRendered(function(){
                $(input).daterangepicker({
                    singleDatePicker: true,
                    showDropdowns: true,
                    locale: {
                        format: 'YYYY-MM-DD'
                    }
                }, function(start, end, label) {
                    success(start.format('YYYY-MM-DD'));
                });

                $(input).focus();
            });

            input.addEventListener("blur", function(e){
                cancel();
            });

            return input;
        };


		// 편집 불가셀 
		var nonEditableFormatter = function(cell, formatterParams) {
			cell.getElement().style.fontSize = "15px"; // Light pink background
			// 글자 두껍게
			cell.getElement().style.fontWeight = "bold";
			// 글자 파란색
			cell.getElement().style.color = "blue";
			return cell.getValue();
		};


        // Create Tabulator on DOM element with id "example-table1"
		var table1 = new Tabulator("#example-table1", {
			height: "300px",
			data: tableData1,
			selectable: 1, // Allow row selection
			layout: "fitColumns", // Fit columns to width of table
			columns: [ // Define table columns
				// {title:"ID", field:"id", width:70, editor:false, maxWidth:100}, // ID column, not editable
				{title: "소속팀", field: "process", editor: "input", maxWidth: 110}, // Editable columns
				{title: "직무명", field: "current", editor: "input", maxWidth: 125}, // Use custom editor
				{title: "직무변경일자", field: "pm", editor: pmEditor, formatter: pmFormatter, maxWidth: 125}, // Use custom editor
				{title: "안전보건직무", field: "minCurrent", editor:false, formatter:nonEditableFormatter, maxWidth: 125},
				{title: "신규교육일자", field: "maxCurrent", editor:false, formatter:nonEditableFormatter, maxWidth: 125},
				{title: "최근 보수 교육일자", field: "maxCurrent", editor:"date", maxWidth: 160},
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
        var table2 = new Tabulator("#example-table2", {
            height:"300px",
            data:tableData2,
			selectable:1, // Allow row selection
            layout:"fitColumns", // Fit columns to width of table
			columns:[ // Define table columns
				{title:"자격증 종류", field:"id", width:150, editor:false, maxWidth:150}, // ID column, not editable
				{title:"취득일자", field:"minTemp", editor:"input", maxWidth:150},
				{title:"유효기간", field:"maxTemp", editor:"input", maxWidth:150},
				{title:"발행처", field:"temperature", editor:false, formatter:nonEditableFormatter, maxWidth:150}, // Editable columns
				{title:"첨부", field:"temperature", editor:false, formatter:nonEditableFormatter, maxWidth:150}, // Editable columns
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
			table2.addRow({});
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
</script>
