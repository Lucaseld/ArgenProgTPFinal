const mysql=require('mysql2');
mysql.debug = true;

module.exports = ()=>{
    return mysql.createConnection({
        host: 'localhost',
        user: 'newuser',
        password: '155302',
        database: 'libreria'
    });
}