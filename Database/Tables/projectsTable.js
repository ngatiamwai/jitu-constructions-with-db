const mssql = require('mssql');
const {sqlConfig} = require('/Config/config')

const createProjectsTable = async (req, res, next) => {
    try {
        const table = `
        BEGIN TRY CREATE TABLE projectsTable(
            id VARCHAR(200) PRIMARY KEY,
            project_name VARCHAR (500) NOT NULL,
            description VARCHAR (1000) NOT NULL,
            project_location VARCHAR (200) NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL
        )
        END TRY BEGIN CATCH THROW 50001, 'Table already exists!', 1;
        END CATCH
        `

    const pool = await mssql.connect(sqlConfig)

    await pool.query(table, (err)=>{
        if (err instanceof mssql.RequestError){
            console.log({Error: err.message});
        }else{
            console.log('Table Created Successfully');
        } 
    })

    } catch (error) {
        return res({Error: error})
    }
}
createProjectsTable();

module.exports ={
    createProjectsTable
}