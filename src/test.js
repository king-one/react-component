$.ajax({
    url: '/export/download', data: { 'ids[]': 'd67230e1fb8f4cb4b4aac7e1e23d3dde' },
    method: 'POST',
    responseType = "blob"
}).done(function(response){
        console.log(response);
		var a = document.createElement('a')
		a.download = 'aaa.mp4'
		a.href = window.URL.createObjectURL(response)
		a.click()
})
var xhr = (function() {
    var formdata = new FormData();
    formdata.append('ids[]','d67230e1fb8f4cb4b4aac7e1e23d3dde');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/export/download')
	xhr.responseType = "blob"
	xhr.onload = function() {
		var blob = xhr.response
		var a = document.createElement('a')
		a.download = 'aaa.xlsx'
		a.href = window.URL.createObjectURL(blob)
		a.click()
	}
    xhr.send(formdata);
	return xhr
})()