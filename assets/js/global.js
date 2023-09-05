let base_url = window.location.origin + '/';

$(document).ready(function() {
	table_content();
});

const table_content = () => {
	$.ajax({
		url: base_url + 'home/get_data/',
		type: "post",
		processData: false,
		contentType: false,
		cache: false,
		async: false,
		beforeSend: function() {

		},
		success: function(res) {
			let result = jQuery.parseJSON(res);
			let tables = $.fn.dataTable.fnTables(true);

			$(tables).each(function() {
				$('#table-content').dataTable().fnClearTable();
				$('#table-content').dataTable().fnDestroy();
			});

			$('#table-content').DataTable({
				"autoWidth": true,
				// "order": [[5, 'desc']],
				"data": result,
				"columns": [{
					"data": "no"
					},
					{
					"data": "kepada"
					},
					{
					"data": "kantor_cabang"
					},
					{
					"data": "deskripsi_jasa"
					},
					{
					"data": "jumlah"
					},
					{
					"data": "alasan_permintaan"
					},
					{
					"data": "pemohon"
					},
					{
					"data": "kepala_cabang"
					},
					{
					"data": "gadept_appr"
					},
					{
					"data": "finndept_appr"
					},
					{
					"data": "accdept_appr"
					},
					{
					"data": "created_date"
					}
				]
			});
			
			$(this).empty();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			let result = jQuery.parseJSON(textStatus);

			$(this).empty();
		}
	});
}

$("#form-auth").on("submit", function( event ) {
	const username = $("#username").val();
	const password = $("#password").val();

	let formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);
	formData.append("submit", true);

	$.ajax({
		url: base_url,
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		cache: false,
		async: false,
		beforeSend: function () {},
		success: function (res) {
			let toast_type = "";
			let toast_color = "";
			let toast_svg = "";

			let result = jQuery.parseJSON(res);

			$(this).empty();
			if (result["status"] == "error") {
				toast_type = "danger";
				toast_color = "red";
				toast_svg =
					'    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
					'    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>' +
					"</svg>";

				$("#toast").append(
					'<div id="toast-' +
						toast_type +
						'" style="" class="flex items-center w-full max-w-xs p-4 mb-1 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">' +
						'<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-' +
						toast_color +
						"-500 bg-" +
						toast_color +
						"-100 rounded-lg dark:bg-" +
						toast_color +
						"-800 dark:text-" +
						toast_color +
						'-200">' +
						toast_svg +
						'    <span class="sr-only">' +
						toast_type +
						" icon</span>" +
						"</div>" +
						'<div class="ml-3 text-sm font-normal">' +
						result["response"] +
						"</div>" +
						'<button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-' +
						toast_type +
						'" aria-label="Close">' +
						'    <span class="sr-only">Close</span>' +
						'    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">' +
						'     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>' +
						"    </svg>" +
						"</button>" +
						"</div>"
				);
			} else {
				// toast_type = "success";
				// toast_color = "green";
				// toast_svg =
				// 	'    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
				// 	'        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />' +
				// 	"    </svg>";

				window.location = base_url + "home";
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			let result = jQuery.parseJSON(textStatus);

			Swal.showValidationMessage(
				// `Request failed: ${error}`
				`Request failed`
			);

			$(this).empty();
		},
	});

	event.preventDefault();
});

$("#form-add-ga12b").on("submit", function( event ) {
	event.preventDefault();

	const loopCount = $("input[id^='deskripsi-barang-']").length;
	
	const kepada = $("#kepada").val();
	const kantor_cabang = $("#kantor-cabang").val();

	let formData = new FormData();
	formData.append("submit", true);
	formData.append("kepada", kepada);
	formData.append("kantor_cabang", kantor_cabang);

	for (let i = 0; i < loopCount; i++) {
		let deskripsi_barang = $("#deskripsi-barang-" + (i + 1)).val();
		let jumlah = $("#jumlah-" + (i + 1)).val();
		let alasan_permintaan = $("#alasan-permintaan-" + (i + 1)).val();

		formData.append("deskripsi_barang[]", deskripsi_barang);
		formData.append("jumlah[]", jumlah);
		formData.append("alasan_permintaan[]", alasan_permintaan);
	}

	$.ajax({
		url: base_url + 'home/submit_form_ga12b',
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		cache: false,
		async: false,
		beforeSend: function () {},
		success: function (res) {
			let toast_type = "";
			let toast_color = "";
			let toast_svg = "";

			let result = jQuery.parseJSON(res);

			$(this).empty();
			if (result["status"] == "error") {
				toast_type = "danger";
				toast_color = "red";
				toast_svg =
					'    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
					'    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>' +
					"</svg>";
			} else {
				toast_type = "success";
				toast_color = "green";
				toast_svg =
					'    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
					'        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />' +
					"    </svg>";
			}

			$("#toast").append(
				'<div id="toast-' +
					toast_type +
					'" style="" class="flex items-center w-full max-w-xs p-4 mb-1 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">' +
					'<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-' +
					toast_color +
					"-500 bg-" +
					toast_color +
					"-100 rounded-lg dark:bg-" +
					toast_color +
					"-800 dark:text-" +
					toast_color +
					'-200">' +
					toast_svg +
					'    <span class="sr-only">' +
					toast_type +
					" icon</span>" +
					"</div>" +
					'<div class="ml-3 text-sm font-normal">' +
					result["response"] +
					"</div>" +
					'<button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-' +
					toast_type +
					'" aria-label="Close">' +
					'    <span class="sr-only">Close</span>' +
					'    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">' +
					'     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>' +
					"    </svg>" +
					"</button>" +
				"</div>"
			);
			
			table_content();

			$('#modalFormStaticBackdrop').modal('hide');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			let result = jQuery.parseJSON(textStatus);

			Swal.showValidationMessage(
				// `Request failed: ${error}`
				`Request failed`
			);

			$(this).empty();
		},
	});

	// event.preventDefault();
});



$("#toast").on("click", function() {
	$("#toast").html("");
});

const int = (evt) => {
	var theEvent = evt || window.event;

	// Handle paste
	if (theEvent.type === 'paste') {
		key = event.clipboardData.getData('text/plain');
	} else {
	// Handle key press
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

let loop = 0;
const add_row = () => {
// $(() => {
	// $('#add_row').click(function(){
	// $('#add_row').on("click", function() {
        let flag = true;
        $('div').find("input[type=text]").each(function(i){
            if($(this).val() === '' && i >= 2) {
				flag = false;
			}
        });

        // alert(flag);
		if (flag) {
			$('#add_row').remove();

			$('#field-container').append(
				'<div id="field-' + (1 + loop) + '" class="grid grid-cols-10 gap-2">'
				+ '	<div class="relative mb-3 col-span-5" data-te-input-wrapper-init="">'
				+ '		<input type="text" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.33rem] text-xs leading-[1.5] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&amp;:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="deskripsi-barang-' + (1 + loop) + '" placeholder="Form control sm">'
				+ '		<label for="deskripsi-barang" class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-xs leading-[1.5] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.75rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.75rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary" style="margin-left: 0px;">Deskripsi Barang/Jasa'
				+ '		</label>'
				+ '	<div class="group flex absolute left-0 top-0 w-full max-w-full h-full text-left pointer-events-none" data-te-input-notch-ref=""><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none left-0 top-0 h-full w-2 border-r-0 rounded-l-[0.25rem] group-data-[te-input-focused]:border-r-0 group-data-[te-input-state-active]:border-r-0 border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-leading-ref="" style="width: 9px;"></div><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow-0 shrink-0 basis-auto w-auto max-w-[calc(100%-1rem)] h-full border-r-0 border-l-0 group-data-[te-input-focused]:border-x-0 group-data-[te-input-state-active]:border-x-0 group-data-[te-input-focused]:border-t group-data-[te-input-state-active]:border-t group-data-[te-input-focused]:border-solid group-data-[te-input-state-active]:border-solid group-data-[te-input-focused]:border-t-transparent group-data-[te-input-state-active]:border-t-transparent border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-middle-ref="" style="width: 104px;"></div><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow h-full border-l-0 rounded-r-[0.25rem] group-data-[te-input-focused]:border-l-0 group-data-[te-input-state-active]:border-l-0 border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-trailing-ref=""></div></div></div>'
				+ '	<div class="relative mb-3 col-span-1" data-te-input-wrapper-init="">'
				+ '		<input type="text" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.33rem] text-xs leading-[1.5] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&amp;:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="jumlah-' + (1 + loop) + '" onkeypress="int(event)" placeholder="Form control sm">'
				+ '		<label for="jumlah" class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-xs leading-[1.5] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.75rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.75rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary" style="margin-left: 0px;">Jumlah'
				+ '		</label>'
				+ '	<div class="group flex absolute left-0 top-0 w-full max-w-full h-full text-left pointer-events-none" data-te-input-notch-ref=""><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none left-0 top-0 h-full w-2 border-r-0 rounded-l-[0.25rem] group-data-[te-input-focused]:border-r-0 group-data-[te-input-state-active]:border-r-0 border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-leading-ref="" style="width: 9px;"></div><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow-0 shrink-0 basis-auto w-auto max-w-[calc(100%-1rem)] h-full border-r-0 border-l-0 group-data-[te-input-focused]:border-x-0 group-data-[te-input-state-active]:border-x-0 group-data-[te-input-focused]:border-t group-data-[te-input-state-active]:border-t group-data-[te-input-focused]:border-solid group-data-[te-input-state-active]:border-solid group-data-[te-input-focused]:border-t-transparent group-data-[te-input-state-active]:border-t-transparent border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-middle-ref="" style="width: 39.2px;"></div><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow h-full border-l-0 rounded-r-[0.25rem] group-data-[te-input-focused]:border-l-0 group-data-[te-input-state-active]:border-l-0 border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-trailing-ref=""></div></div></div>'
				+ '	<div class="relative mb-3 col-span-3" data-te-input-wrapper-init="">'
				+ '		<input type="text" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.33rem] text-xs leading-[1.5] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&amp;:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="alasan-permintaan-' + (1 + loop) + '" placeholder="Form control sm">'
				+ '		<label for="alasan-permintaan" class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-xs leading-[1.5] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.75rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.75rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary" style="margin-left: 0px;">Alasan Permintaan'
				+ '		</label>'
				+ '	<div class="group flex absolute left-0 top-0 w-full max-w-full h-full text-left pointer-events-none" data-te-input-notch-ref=""><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none left-0 top-0 h-full w-2 border-r-0 rounded-l-[0.25rem] group-data-[te-input-focused]:border-r-0 group-data-[te-input-state-active]:border-r-0 border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-leading-ref="" style="width: 9px;"></div><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow-0 shrink-0 basis-auto w-auto max-w-[calc(100%-1rem)] h-full border-r-0 border-l-0 group-data-[te-input-focused]:border-x-0 group-data-[te-input-state-active]:border-x-0 group-data-[te-input-focused]:border-t group-data-[te-input-state-active]:border-t group-data-[te-input-focused]:border-solid group-data-[te-input-state-active]:border-solid group-data-[te-input-focused]:border-t-transparent group-data-[te-input-state-active]:border-t-transparent border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-middle-ref="" style="width: 88.8px;"></div><div class="pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow h-full border-l-0 rounded-r-[0.25rem] group-data-[te-input-focused]:border-l-0 group-data-[te-input-state-active]:border-l-0 border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary" data-te-input-notch-trailing-ref=""></div></div></div>'
				+ '	<div id="add_row" onclick="add_row()" class="col-span-1">'
				+ '		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">'
				+ '			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>'
				+ '		</svg>'
				+ '	</div>'
				+ '</div>'
			);

			loop++;
		}
    // });
// });
}