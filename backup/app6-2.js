const
cheerio = require('cheerio'),
fs = require('fs'),
request = require('request'),

urlSekolahan = 'https://yogyaprov.siap-ppdb.com/sekolah/1-sma-reguler.json',
urlDaftarSiswa ='https://yogyaprov.siap-ppdb.com/seleksi/reguler/sma/1-32040009-1000.json'
getJsonSekolahan(urlSekolahan)

function getJsonSekolahan(url){
    var fileName = 'sekolahan.json'
    var isiJsonFile	
    // cek apakah JSON pernah diunduh?
    if(fs.existsSync(fileName))
    {
    // jika pernah, baca file hasil unduhan
    isiJsonFile = fs.readFileSync(fileName, 'utf8')
    tampilkanSekolahan(isiJsonFile);
    } 
    else {
    // Mengunduh laman web data sekolahan
    request(url, unduhSekolahan);
    }

function unduhSekolahan(error, response, body) {
	if(error)
	{
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
	//console.log(jsSek)
	var idxSekolah = 0;
	var obj = {
	idx: idxSekolah,	
	jsn: jsSek
	}
	console.log(obj)
	var siSiswa = setInterval(unduhSiswa.bind(obj), 5000) // untuk gabungin file
	//var siSiswa = unduhSiswa.bind(obj)
}

function unduhSiswa(){
	var sek = this.jsn[this.idx];
	//console.log(sek)
	var url = urlDaftarSiswa//.replace('32040009', sek.sekolah_id); // untuk  banyak sekolah
	request(url, tampilkanSiswa)
	this.idx++;
}

function tampilkanSiswa(err, res, body){
	if(err)
	{
	console.log("Error: " + err);
	return;
	}
	var jsn = JSON.parse(body);
	//console.log(jsn)
	//console.log(jsn.sekolah.npsn + '\t' + jsn.sekolah.nama);
	var dta = jsn.data;
	for(var i=0; i<dta.length; i++){
		//console.log(dta[i])
		console.log((i+1), dta[i][2], dta[i][3], dta[i][2])
		//obj.push({id: (i+1), nama:dta[i][3], nomortest:dta[i][2]});
 		//var json = JSON.stringify(obj);
		//console.log(json)
		//fs.writeFile('A.json', json, 'utf8', function(err, result){
     	//if(err) console.log('error', err);});
		}
	}
}