const 
	axios = require('axios'),
	fs = require('fs'),
	got = require('got'),
	cheerio = require('cheerio')
	
var dataSiswaList = 'data_siswa.json'
var baseUrlList = 'https://yogyaprov.siap-ppdb.com/seleksi/reguler/sma/1-32040009-1000.json'
var baseUrlSiswa = 'https://yogyaprov.siap-ppdb.com/#/040001/detail/'

if(fs.existsSync(dataSiswaList)){
	result = fs.readFileSync(dataSiswaList, 'utf8')
	console.log('HTML file Exist')
	test = fs.readFileSync('test.html', 'utf8')
}
else {
	try {
	axios.get(baseUrlList)
	//result = response.body
	//fs.writeFileSync(dataSiswaList, result)
		.then(({ data }) => fs.writeFileSync(dataSiswaList, data))
	}
	catch{
		console.log('error');
	}
	
}
//console.log(result)
/**
parseHtml(result)
async function parseHtml(html) {
	const $ = cheerio.load(html)
	const dataParseSiwsaList = $('#hasil > div:nth-child(2) > div > div > div > div > div > div.lengkap > table > tbody > tr:nth-child(1) > th > span > a').each(function (index, element) {
		let nama = $(element).find('.th > span > a').text();
		console.log(nama);
		//hasil > div:nth-child(2) > div > div > div > div > div > div.lengkap > table > tbody > tr:nth-child(1) > th > span > a
	})
}

//const $ = cheerio.load(result)
var out = [];
$("#hasil > div:nth-child(2) > div > div > div > div > div > div.lengkap > table > tbody > tr:nth-child(1) > th > span > a").each(function (index, element) {
	out.push($(element).text());
});
console.log(out) **/