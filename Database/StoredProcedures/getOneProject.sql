-- CREATE OR ALTER PROCEDURE getOneProject(@id VARCHAR)
--  AS BEGIN
-- SELECT * FROM projectsTable WHERE id = @id
-- END

USE JituConstruction;
GO
CREATE OR ALTER PROCEDURE ProcGetProject (@id VARCHAR(200))
AS BEGIN
SELECT * FROM projectsTable WHERE id = @id
END
EXEC ProcGetProject "22c097a2-afb9-4049-bca1-0f00ef3d6bf0"