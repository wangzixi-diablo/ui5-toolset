// @ts-nocheck
const log = require('./log.js');

console.log('Jerry: ', log.log('Hello'));

var bodyParser = require('body-parser');
var request = require('request');
var path = require('path'), express = require('express');
var qs = require('querystring');
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var url = require("url");
var DEFAULTPORT = 3002;
var port = process.env.PORT || DEFAULTPORT;

/*
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com;frame-ancestors 'none'");
    return next();
});*/

/*const frameguard = require('frameguard');
app.use(frameguard({ action: 'SAMEORIGIN' }));
*/
/*app.use(bodyParser.text({
	type: 'multipart/mixed'
}));*/

function sendRequest(req) {
	var url = req.url.slice(1);
	console.log('sending request for url: ', url, ' method: ', req.method);
	var oOptionsGet = {
		url: url,
		method: 'GET'
	};
	var oOptionsPost = {
		url: url,
		method: 'POST',
		json:false,
        headers: {
            "content-type": req.get('content-type')
        },
        body: req.body
	};

	var oOptions = req.method != 'POST'? oOptionsGet:oOptionsPost;

	return new Promise(function(resolve,reject){
		if( req.method != 'POST'){
  			request.get(oOptions,function(error,response,body){
				if(error){
	  				console.log("error occurred: " + error);
	  				reject(error);
				}
				resolve(body);
			});
		}
		else{
			request.post(oOptions,function(error,response,body){
				if(error){
	  				console.log("error occurred: " + error);
	  				reject(error);
				}
				resolve(body);
			});
		} 
 	});
}

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 9.0.0');
	next();
  });

app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use('/barcode', express.static(path.join(__dirname, 'barcode')));
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

app.post('/token', function(req, res){
	res.send("你好");
 });

app.get('/https://services.odata.org/*', function(req, res){
	sendRequest(req).then(function(data){
		var contentType = req.get('Accept');
		console.log('content type of get response will be set to: ', contentType);
		res.set('Content-Type', contentType);
		console.log('data:' , data);
		res.send(data);
	});
});

app.post('/https://services.odata.org/*', function(req, res){
	sendRequest(req).then(function(data){
		var contentType = req.get('content-type');
		console.log('content type of post response will be set to: ', contentType);
		res.set('Content-Type', contentType );
		res.send(data);
	});
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