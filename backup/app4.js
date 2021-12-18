const 
	fs = require('fs'),
	got = require('got'),
	cheerio = require('cheerio'),
    axios = require('axios')

async function fetchPage(){
    var dataSiswaList = 'dataSiswaList.html'
    var baseUrlList = 'https://yogyaprov.siap-ppdb.com/#/040001/hasil/seleksi/42040001/1/1/simple'
    var baseUrlSiswa = 'https://yogyaprov.siap-ppdb.com/#/040001/detail/'
    console.log(baseUrlList)
    var result
    if(fs.existsSync(dataSiswaList)){
        result = fs.readFileSync(dataSiswaList, 'utf8')
    }
    else{
        try {
            const response = await got('baseUrlList');
            result = response.body
            console.log(result)
            fs.writeFileSync(dataSiswaList, result)
        }
        catch(err){
            console.log(error.response.body);
        }
    }
}