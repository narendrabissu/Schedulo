const Pool=require('pg').Pool;
const pool =new Pool({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"Vanshika",
    database:"schedulo"
});

module.exports=pool;
