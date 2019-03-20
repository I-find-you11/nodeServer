let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'filemanage'
});
let mysqlFn = {
    //svn信息添加
    svnInforAdd(data,res){                     //添加svn信息表数据
        let addSql = 'INSERT INTO svninfor(name,url,content) VALUES(?,?,?)';
        let addSqlParams = [data.name,data.url,data.content];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return '';
            }
            //connection.end();
            res.json({code:200,mes:'登陆成功'});
        });
    },
    backSvnData(data,res){
        let backData = {                                                              //接口返回数据
            pageNum:null,
            data:{}
        }   
        let num = 10;                                                                 //查询数据条数
        let start = data.page * num;                                                  //查询数据开始位置
        let getPageSql = 'SELECT * FROM svninfor LIMIT ' + start + ',' + num;         //mysql语句：查询svn信息表数据  查询10条
        let getDataLengthSql = 'SELECT count(1) FROM svninfor';                       //mysql语句：查询最大条数
        let waitPromise = new Promise((resolve, reject)=>{

            //查询分页数据
            connection.query(getPageSql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return '';
                }
                result = JSON.stringify(result);
                result = JSON.parse(result);
                backData.data = result;
                resolve();
            });
        })
        waitPromise.then(()=>{

            //查询最大条数
            connection.query(getDataLengthSql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return '';
                }
                result = JSON.stringify(result);
                result = JSON.parse(result);
                console.log(result[0]['count(1)']);
                backData.pageNum = result[0]['count(1)'];
                //connection.end();                      //关闭连接
                res.json({                               //返回数据
                    code:200,
                    data:backData
                });
            });
        })  
        
    },
    changeSvnInfor(data,res){
        var changeSql = 'UPDATE svninfor SET name = ?,url = ?,content = ? WHERE Id = ?';
        var changeSqlParams = [data.name, data.url,data.content,data.id];
        //改
        connection.query(changeSql,changeSqlParams,function (err, result) {
            if(err){
                    console.log('[UPDATE ERROR] - ',err.message);
                    return ;;
            }
            res.json({code:200,msg:'修改成功'});
        });
    },
    deleteSvnFn(data,res){
        var delSql = 'DELETE FROM svninfor where id=' + data.id;
        //删
        connection.query(delSql,function (err, result) {
            if(err){
                console.log('[DELETE ERROR] - ',err.message);
                return '';
            }       
            res.json({code:200,msg:'删除成功'}); 
        });
    }
}
module.exports = {connection,mysqlFn};


