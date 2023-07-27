CREATE
OR ALTER PROCEDURE createProjectPROC (
    @id VARCHAR(200),
    @project_name VARCHAR(200),
    @description VARCHAR(500),
    @project_location VARCHAR(200),
    @startdate DATE,
    @enddate DATE
) AS BEGIN
INSERT INTO
    projectsTable(
        id,
        project_name,
        description,
        project_location,
        startdate,
        enddate
    )
VALUES
(
        @id,
        @project_name,
        @description,
        @project_location,
        @startdate,
        @enddate
    )
END

SELECT * FROM projectsTable