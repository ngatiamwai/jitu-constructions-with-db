const { v4 } = require('uuid');
const { sqlConfig } = require('../Config/config');
const mssql = require('mssql')

const projects = [];

class Project{
    constructor (id, project_name, description, project_location, startdate, enddate ){
        this.project_name = project_name
        this.description = description
        this.project_location = project_location
        this.startdate = startdate
        this.enddate = enddate
    }
}

const createProject = async (req, res) => {

    

    try {
        const id = v4()
        // console.log(req.body);

        const { project_name, description, project_location, startdate, enddate } = req.body
        const newProject = { id, project_name, description, project_location, startdate, enddate }

        // projects.push(newProject)
       const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id',id)
        .input('project_name',project_name)
        .input('description',description)
        .input('project_location',project_location)
        .input('startdate',startdate)
        .input('enddate',enddate)

        .execute('createProjectPROC')
        
        // .query(`INSERT INTO projectsTable (id, project_name, description, project_location, startdate, enddate) VALUES (${id}, ${project_name}, ${project_location}, ${startdate}, ${enddate})`)
       
        console.log(result);
        // console.log(projects)

        res.json({
            message: 'Project created',
            project: newProject,
        })
    } catch (error) {
        return res.json({ error })
    }
}


const getProjects = async (req, res) => {
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allproject = (await pool.request().execute('getAllProjects')).recordset

        res.json({ projects: allproject });
    } catch (error) {
        return res.json({ error })
    }
}
const getOneProject = async (req, res) => {
    try {
        const {id} = req.params
        
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('id', id)
            .execute('ProcGetProject')
            .then((result)=>{
              return  res.status(200).json({message: 'Fetch successful', data: result.recordset})
            })
            .catch((e)=>{
                console.log(e.message);
            })
        })
        .catch((e)=>{
            console.log(e.message);
        })

        // const pool = await mssql.connect(sqlConfig)

        // const project = (await pool.request().input('id', id).execute('getOneProject')).recordset


        // const project = projects.filter(el => el.id == id)
        // return res.json({ 
        //     project : project 
        // })

    } catch (error) {
        return res.json({ error})
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id

        const { project_name, description, project_location, startdate, enddate } = req.body

        const project_index = projects.findIndex(project=> project.id == id)

        if(project_index<0 ){
            res.json('Project not found')
        }else{
            projects[project_index] = new Project (id, project_name, description, project_location, startdate, enddate)
        }
        res.json({
            message: 'Project updated successfully',
            project: projects[project_index]
        })
    } catch (error) {
        return res.json({ error})
    }
}

const deleteProject = async (req, res)=>{
    try {
        const id = req.params.id

        let project_index = projects.findIndex(project => project.id == id);

        if(project_index < 0){
            res.json({message: 'Project not found'})

        }else{
            projects.splice(project_index, 1)
        }

        res.json(
            {message: 'Project deleted successfully'
        })
    } catch (error) {
        return res.json({Error: error})
        
    }
}

module.exports = {
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
}