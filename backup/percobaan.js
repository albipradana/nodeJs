const
 json2html = require('node-json2html');
 cheerio = require('cheerio'),
 fs = require('fs'),
 request = require('request'),
 http = require('http'),
 urlSekolahan = 'https://yogyaprov.siap-ppdb.com/sekolah/1-sma-reguler.json',
 urlDaftarSiswa = 'https://yogyaprov.siap-ppdb.com/seleksi/reguler/sma/1-32040009-1000.json'
 urlDetail = 'https://api.siap-ppdb.com/cari?no_daftar=479100320050250'
 


getJsonSekolahan(urlSekolahan)
 
 function getJsonSekolahan(url){
 var fileName = 'sekolahan.json'
 var isiJsonFile
 // cek apakah JSON pernah diunduh?
 if(fs.existsSync(fileName)){
 // jika pernah, baca file hasil unduhan
 isiJsonFile = fs.readFileSync(fileName, 'utf8')
 tampilkanSekolahan(isiJsonFile);
 } else {
 // Mengunduh laman web data sekolahan
 request(url, unduhSekolahan);
 }
 
 function unduhSekolahan(error, response, body) {
 if(error){
 console.log("Error: " + error.message)
 return;
 }
 // Print the response status code if a response was received
 console.log('statusCode:', response && response.statusCode);
 tampilkanSekolahan(body);
 fs.writeFileSync(fileName, body)
 }
 
 function tampilkanSekolahan(isiJsonFile){
 var jsSek = JSON.parse(isiJsonFile);
 var idxSekolah = 0;
 var obj = {
 idx: idxSekolah,
 jsn: jsSek
 }
 var siSiswa = setInterval(unduhSiswa.bind(obj), 5000)
 }
 
 function unduhSiswa(){
 var sek = this.jsn[this.idx];
 var url = urlDaftarSiswa;
 request(url, tampilkanSiswa)
 this.idx++;
 }
 
 
 
 
 function tampilkanSiswa(err, res, body){
 if(err){
 console.log("Error: " + err);
 return;
 }
var obj = [];
let data = obj;
 var jsn = JSON.parse(body);
 //console.log(jsn.sekolah.npsn + '\t' + jsn.sekolah.nama);
 var dta = jsn.data;
 for(var i=0; i<dta.length; i++){
//console.log((i+1),dta[i][3],dta[i][2])

obj.push({id: (i+1), nama:dta[i][3], nomortest:dta[i][2]});
 var json = JSON.stringify(obj);
fs.writeFile('A.json', json, 'utf8', function(err, result){
     if(err) console.log('error', err);});
 }
 }

 }
  
let template = 
    {"<>": "tr", "id":"${id}", "html":[
        {"<>": "td", "text": "${id}"},
		{"<>": "td", "text": "${nama}"},
		{"<>": "td", "text": "${nomortest}"}
    ]};
    


var text = fs.readFileSync('A.json','utf8')

let html = json2html.render(text,template);

 
var head='<html><style>table, th, td {  border:1px solid black; }</style><table style="width:100%"><tr><th>No Urut</th><th>Nama</th><th>No Test</th></tr>'
var isi = html
var bottom='</table></html>'
var IndexHTML = head + '\n' + isi + '\n' + bottom
fs.writeFileSync('test.html', IndexHTML)
/*
var port = 3003;
http.createServer(function (req, res) {
	fs.readFile('test.html', function(err, data){
		res.writeHead(400, {'Content-Type': 'plain/text'});
		res.write(data);
		console.log(data);
		return res.end();
		});
}).listen(port);
 */
 
 
 
  