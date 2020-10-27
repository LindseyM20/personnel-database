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
  Salary DECIMAL NULL,
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

INSERT INTO roles (Title)
VALUES 
("CEO"),
("CFO"),
("President"),
("Supporting Character");

INSERT INTO personnel (First_name, Last_name, RoleID)
VALUES ("Bugs", "Bunny", 1);

INSERT INTO personnel (First_name, Last_name, RoleID)
VALUES ("Elmer", "Fudd", 2);

INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
VALUES ("Daffy", "Duck", 3, 1);

-- INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
-- VALUES ("Road", "Runner", 4, 1, 10000, "Daffy Duck");

-- INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
-- VALUES ("Tasmanian", "Devil", 4, 2, 10000, "Elmer Fudd");

-- INSERT INTO personnel (First_name, Last_name, RoleID, ManagerID)
-- VALUES ("Porky", "Pig", 4, 1, 10000, "Daffy Duck");

-- INSERT INTO personnel (First_name, Last_name, RoleID, DeptID, Salary, Manager)
-- VALUES ("Bugs", "Bunny", 1, "Good Guys", 25000, NULL);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM personnel;
