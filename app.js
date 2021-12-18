const request = require('request');
const fs = require('fs');
const tbl = require('node-json2html');
//const http = require('http');

const dataSiswa = 'https://yogyaprov.siap-ppdb.com/seleksi/reguler/sma/1-32040009-1000.json';
const dataSiswaDetails = 'https://api.siap-ppdb.com/cari?no_daftar=479100320050250';
var fileName = 'data_siswa.json'

if(fs.existsSync(fileName)){
    fs.readFile('data_siswa.json', (err, data) => {
        if (err) throw err;
        //colet student = JSON.parse(data);
        //console.log(student);
        fetchData(data)
    });
}
else {  
    request(dataSiswa, function (error, response, body) {
        json(body);
    });
}

//----------Select data siswa--------//
async function json(js){
    var parseJs = JSON.parse(js);
    var siswa = parseJs.data
    var out = [];
    var fileName = 'data_siswa.json'
    //console.log(siswa)
    for(let i=0; i<siswa.length; i++){
        out.push({id: (i+1), nama:siswa[i][3], nomortest:siswa[i][2]});
        id = siswa[i][2]
        //console.log(id)
        detailSiswa(id)
    };
    var jst = JSON.stringify(out);
    fs.writeFile(fileName,  jst, 'utf8', function(err, result){
        if(err) console.log('error', err);});
    //console.log(id);
}
function detailSiswa(dt){  
    var fileNameDetail = 'data_detail.json'
    var newUrlDetail = dataSiswaDetails.replace('479100320050250', id)
    //console.log(newUrlDetail)
    // for(let i=0; 1<newUrlDetail.length; i++){
    //     request({
    //         headers: {
    //             'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
    //               'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         uri: dataSiswaDetails,
    //         method: 'POST'
    //       }, function (err, res, body) {
    //        console.log(body)
    //        var result = JSON.parse(JSON.stringify(body));
    //        console.log(result[0][3][2][3]);
    //       });

    //     // var jstDetail = JSON.stringify(result)
    //     // fs.writeFile(fileNameDetail,  jst, 'utf8', function(err, result){
    //     //     if(err) console.log('error', err);});
    //     // console.log(jstDetail)
    // }
    request({
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: dataSiswaDetails,
        method: 'POST'
        }, function (err, res, body) {
        console.log(body)
        var result = JSON.parse(JSON.stringify(body));
        console.log(result[0][3][2][3]);
        });
}
function getDataDetail(data){
    //var parseJson = JSON.parse(data)
    //console.log(parseJson)
}

//---------Convert Json to HTML--------//
function fetchData(data){
    let template = 
    {"<>": "tr", "id":"${id}", "html":[
        {"<>": "td", "text": "${id}"},
		{"<>": "td", "text": "${nama}"},
		{"<>": "td", "text": "${nomortest}"}
    ]};
    let text = JSON.parse(data);
    //console.log(text)
    let html = tbl.render(text,template);
    var head='<html><style>table, th, td {  border:1px solid black; }</style><table><tr><th>No Urut</th><th>Nama</th><th>No Test</th></tr>'
    var body = html
    var bottom='</table></html>'
    var IndexHTML = head + '\n' + body + '\n' + bottom
    fs.writeFileSync('siswa.html', IndexHTML)
}

//-------------Routest-------------//
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

router.get('/A',function(req,res){
    res.sendFile(path.join(__dirname+'/siswa.html'));
  });

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');