function showingLocalForageContent() {
	var table = $('<table id="guestTable" class="table table-striped"></table>');
	var thead = $('<thead> <tr> <th>#</th> <th>Name</th> <th>Email</th> <th>Mobile Number</th> <th>Message</th> </tr> </thead>')
	table.append(thead);
	var tbody = $('<tbody></tbody>')  
	localforage.iterate(function (value, key, iterationNumber) {
		 var trContent = dynamicTbodyContent(value, iterationNumber)
		 tbody.append(trContent)
		 var trContentExcel = dynamicTbodyContentExcel(value, iterationNumber)
		 tbody.append(trContentExcel)
	}, function() {
		table.append(tbody);
		$('#table').html(table)
	})
}

function dynamicTbodyContent(value, index) {
	var message = value.message;
	if(message.length > 60) {
		message = message.substring(0, 60) + "...";
	}
	var tr = $('<tr class="noExl"></tr>');
	 string = '<th>' + index + '</th>';
	 string += '<td>' + value.name + '</td>';
	 string += '<td>' + value.email + '</td>';
	 string += '<td>' + value.mobile + '</td>';
	 string += '<td>' + message + '</td>';
	 tr.append($(string));
	 return tr;
}
function dynamicTbodyContentExcel(value, index) {
	var tr = $('<tr class="hidden"></tr>');
	 string = '<th>' + index + '</th>';
	 string += '<td>' + value.name + '</td>';
	 string += '<td>' + value.email + '</td>';
	 string += '<td>' + value.mobile + '</td>';
	 string += '<td>' + value.message + '</td>';
	 tr.append($(string));
	 return tr;
}

function ResultsToTable(){    
    $("#guestTable").table2excel({
        exclude: ".noExl",
        name: "Results"
    });
}

$(document).ready(function() {
	showingLocalForageContent()
	$('#exportBtn').on('click', function(e){
        e.preventDefault();
        ResultsToTable();
    });
});

