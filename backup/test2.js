/*
var head='<html><style>table, th, td {  border:1px solid black; }</style><table style="width:100%"><tr><th>No Urut</th><th>Nama</th><th>No Test</th></tr>'
var isi = html
var bottom='</table></html>'
var IndexHTML = head + '\n' + isi + '\n' + bottom
fs.writeFileSync('test.html', IndexHTML)*/


const
 request= require('request'),
 cheerio = require('cheerio'),
 fs = require('fs'),
 urlSekolahan = 'https://yogyaprov.siap-ppdb.com/sekolah/1-sma-reguler.json',
 urlDaftarSiswa ='https://yogyaprov.siap-ppdb.com/seleksi/reguler/sma/1-32040009-1000.json',
 urlDetailSiswa ='https://api.siap-ppdb.com/cari?no_daftar=479100320050250'

dataListSiswa(urlDaftarSiswa)

function dataListSiswa(url){
    var fileName = 'list.json'
    var dataList
    if(fs.existsSync(fileName)){
        dataList = fs.readFileSync(fileName, 'utf8')
    }
    else {
        request(url, getDataSiswa);
    }
}

function getDataSiswa(error, response, body) {
	if(error)
	{
	console.log("Error: " + error.message)
	return;
	}
	// Print the response status code if a response was received
	console.log('statusCode:', response && response.statusCode);
	//tampilkanSekolahan(body);
	fs.writeFileSync(fileName, body)
}