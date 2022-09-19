const express=require('express')
const scheduloRoutes=require("./src/schedulo/routes");
const cors=require('cors');
const app=express();
const port=3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
    
app.use('/api/', scheduloRoutes)
app.listen(port,()=>
console.log(`app listening on port ${port}`));