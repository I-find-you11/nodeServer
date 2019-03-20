var fs = require('fs');
function getHtmlFile(url) {
    var fileData;
    try {
        fileData = fs.readFileSync(url, 'utf-8');
    } catch (error) {
        fileData = '';
    }
    return fileData;
}

module.exports = (app) => {  

    //首页路由 这个路由不起作用
    app.get('/',function(req,res){
        res.writeHead(200,{'Content-Type':'text/html'})
        if(getHtmlFile('./index.html')) res.end(data);
    })

    //上传页面路由
    app.get('/upload',function(req,res){
        res.writeHead(200,{'Content-Type':'text/html'})
        var data = getHtmlFile('./page/upload.html');
        if(data != ''){
            res.end(data);
        }else{

        }
    })
}