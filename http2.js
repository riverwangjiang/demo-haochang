var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs");

http.createServer(function (req, res) {
    var pathname=__dirname+url.parse(req.url).pathname;
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }  

    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(pathname,function (err,data){
        res.end(data);
    });

}).listen(8080, "192.168.2.132");

console.log("Server running at http://192.168.2.132:8080/");
