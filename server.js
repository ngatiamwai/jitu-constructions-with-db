const express = require('express');
const mssql = require ('mssql')
const  {sqlConfig} = require('./Config/config')
const { projectrouter } = require('./Routes/projectRoutes.js')

const app = express();

app.use(express.json())
app.use('/project', projectrouter);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.json({Error: err})
})
app.listen(4500,async ()=>{
    await mssql.connect (sqlConfig) 
    console.log('listening on port 4500')
})