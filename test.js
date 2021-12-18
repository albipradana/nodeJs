const fs = require('fs');
const request = require('request');
// request('https://api.siap-ppdb.com/cari?no_daftar=479100320050250', function (error, response, body) {
// 	//json(body);
// 	//var parseJs = JSON.parse(response);
// 	console.log(error)
// 	//console.log(response.body)
// 	//fs.writeFile('new.json',  parseJs, 'utf8', function(err, result){
// 	//	if(err) console.log('error', err);});
// });

const querystring = require('querystring');

var form = {
    username: 'usr',
    password: 'pwd',
    opaque: 'opaque',
    logintype: '1'
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

request({
    headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
      	'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.siap-ppdb.com/cari?no_daftar=479100320050250',
    method: 'POST'
  }, function (err, res, body) {
   console.log(body)
  });

fs.readFile('manual.json', (err, data) => {
	if (err) throw err;
	let student = JSON.parse(data);
	//var no = 1;
	var nama = student[0][3][2][3] + "|"
	var tempatLahir = student[0][3][4][4] + "|"
	var alamat = student[0][3][5][4] + "|"
	var jenisKl = student[0][3][3][3]
	//console.log(nama, tempatLahir, alamat, jenisKl);
});

//nomor urut, nama mahasiswa, tempat lahir, alamat, jenis kelamin