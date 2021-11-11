// @ts-nocheck
const log = require('./log.js');

console.log('Jerry: ', log.log('Hello'));

var path = require('path'), express = require('express');
var qs = require('querystring');
var app = express();
var url = require("url");
var DEFAULTPORT = 3002;
var port = process.env.PORT || DEFAULTPORT;

app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use('/wt', express.static(path.join(__dirname, 'walkthrough')));
app.use('/tree', express.static(path.join(__dirname, 'tree')));
app.use('/mindmap', express.static(path.join(__dirname, 'mindmap')));
app.use('/module', express.static(path.join(__dirname, 'module')));
app.use('/smartfield', express.static(path.join(__dirname, 'smartfield/webapp')));
app.use('/tabledelete', express.static(path.join(__dirname, 'tabledelete/webapp')));
app.use('/jsontabledelete', express.static(path.join(__dirname, 'jsontabledelete/webapp')));
app.use('/smarttable', express.static(path.join(__dirname, 'smarttable/webapp')));
app.use('/odatatable', express.static(path.join(__dirname, 'odata-table')));
app.use('/combine', express.static(path.join(__dirname, 'combineLatest')));
app.use('/purehtml', express.static(path.join(__dirname, 'purehtml')));
app.use('/chart', express.static(path.join(__dirname, 'chart')));


app.get('/', function(req, res){
   res.send("你好");
});

// this service is designed for C:\Code\SPA\sandbox\src\app\react-form

app.get('/echo', function(req, res){
    var arg = url.parse(req.url).query;
    var params = qs.parse(arg);
    var response = params.data + '-------' + params.data.toLowerCase(); 
    res.header("Access-Control-Allow-Origin", "*");
    res.send(response);
});

app.post("/", function(req, res){
	var body = '';
	const regex = /!\[(.*?)\]\((.*?)\)/g;
	var m;
	var printResult = ( array ) => {
		var aResult = [];
    	var url = array[2];
    	var splited = url.split(".");
    	var oResult = {
    		"localFile": array[1] + "." + splited[splited.length-1],
    		"fileUrl": url
    	};
		aResult.push(oResult);
		return aResult;
	};
	req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

    req.on('end', function () {
            var post = qs.parse(body);
            var aResult = [];
            // res.send("your request is: " + post.markdown_source);
            while ((m = regex.exec(post.markdown_source)) !== null) {
    			if (m.index === regex.lastIndex) {
        			regex.lastIndex++;
    			}
    			aResult = aResult.concat(printResult(m));
    		}
    		console.log(aResult);
    		res.json(aResult);
    	});
	});

app.listen(port, function(){
     console.log("App listens on port: " + port);
});