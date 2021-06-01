// @ts-nocheck
var path = require('path'), express = require('express');
var qs = require('querystring');
var app = express();
var url = require("url");
var DEFAULTPORT = 3002;

app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use('/wt', express.static(path.join(__dirname, 'walkthrough')));
app.use('/tree', express.static(path.join(__dirname, 'tree')));
app.use('/mindmap', express.static(path.join(__dirname, 'mindmap')));
app.use('/module', express.static(path.join(__dirname, 'module')));
app.use('/smartfield', express.static(path.join(__dirname, 'smartfield/webapp')));
app.use('/smarttable', express.static(path.join(__dirname, 'smarttable/webapp')));
app.use('/odatatable', express.static(path.join(__dirname, 'odata-table')));

app.get('/', function(req, res){
   res.send("你好");
});

// /echo?data=

app.get('/echo', function(req, res){
    var arg = url.parse(req.url).query;
    var params = qs.parse(arg);
    var response = params.dataJerry + '-------' + params.dataJerry.toLowerCase(); 
    //setTimeout(() => res.send(params.data),1000);
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

/*app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1');
      //res.header("Content-Type", "application/json;charset=utf-8");
      next();
    });
*/

app.listen(process.env.PORT || DEFAULTPORT, function(){
     console.log("Example app listens on port: " + DEFAULTPORT);
});