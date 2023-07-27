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


SELECT * FROM projectsTable