const mysql=require('mysql2');
mysql.debug = true;

module.exports = ()=>{
    return mysql.createConnection({
        host: 'containers-us-west-73.railway.app',
        user: 'root',
        port: 6851,
        password: 'Z7LHhk8qMaG8OlwAQzmI',
        database: 'railway'
    });
}