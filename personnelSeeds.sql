DROP DATABASE IF EXISTS personnelDB;
CREATE DATABASE personnelDB;

USE personnelDB;

CREATE TABLE departments (
  DeptID INT AUTO_INCREMENT PRIMARY KEY,
  Department VARCHAR(30) NULL
);

CREATE TABLE roles (
  RoleID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(30) NULL,
  Salary INT NULL,
  DeptID INT,
  FOREIGN KEY (DeptID)
	REFERENCES departments(DeptID)
);

CREATE TABLE personnel (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  First_name VARCHAR(30) NULL,
  Last_name VARCHAR(30) NULL,
  RoleID INT,
  FOREIGN KEY (RoleID)
	REFERENCES roles(RoleID),
  ManagerID INT,
  FOREIGN KEY (ManagerID)
	REFERENCES personnel(ID)
);

INSERT INTO departments (Department)
VALUES
("Good Guy"),
("Bad Guy");

INSERT INTO roles (Title, Salary, DeptID)
VALUES 
("CEO", 25000, 1),
("CFO", 20000, 2),
("President", 15000, 1),
("Protagonist", 10000, 1),
("Antagonist", 10000, 2);

INSERT INTO personnel (First_name, Last_name, RoleID)
VALUES ("Bugs", "Bunny", 1);

INSERT INTO personnel (First_name, Last_name, RoleID)
VALUES ("Elmer", "Fudd", 2);

INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
VALUES ("Daffy", "Duck", 3, 1);

-- INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
-- VALUES ("Road", "Runner", 4, 3);

INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
VALUES ("Tasmanian", "Devil", 5, 2);

INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
VALUES ("Porky", "Pig", 4, 3);



-- DELETE FROM personnel WHERE Last_name = 'runner';
-- DELETE FROM roles WHERE RoleID = 4;
-- DELETE FROM roles WHERE Title = 'Supporting Character';
-- DELETE FROM departments WHERE DeptID >= 3;

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM personnel;
