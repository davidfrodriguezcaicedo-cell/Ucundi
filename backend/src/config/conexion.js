const mysql = require('mysql2');
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"zonafit_db"
});
const promisePool = pool.promise();

pool.getConnection((err, conn) =>
{
    if(err){
        console.log("hubo un error"+err)
        return;
    }else{
    console.log("funcionando");
    conn.release();}
})
module.exports = promisePool;