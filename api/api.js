var mysql = require('./mysql');

mysql.connection.connect();
module.exports = (app) => {
    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });


    app.post('/svnPost',(req,res)=>{
        var mBack = mysql.mysqlFn.svnInforAdd(req.body,res);
    })

    app.post('/svnGetData',(req,res)=>{
        var mBack = mysql.mysqlFn.backSvnData(req.body,res);
    })

    app.post('/svnChangeData',(req,res)=>{
        var mBack = mysql.mysqlFn.changeSvnInfor(req.body,res);
    })

    app.post('/deleteSvn',(req,res)=>{
        var mBack = mysql.mysqlFn.deleteSvnFn(req.body,res);
    })
}