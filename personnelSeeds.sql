DROP DATABASE IF EXISTS personnelDB;

CREATE DATABASE personnelDB;

USE personnelDB;

CREATE TABLE departments (
  DeptID INT AUTO_INCREMENT PRIMARY KEY,
  Department VARCHAR(30) NULL
);

CREATE TABLE roles (
  RoleID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(30) NULL
);

CREATE TABLE personnel (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  First_name VARCHAR(30) NULL,
  Last_name VARCHAR(30) NULL,
  RoleID INT,
  CONSTRAINT title
  FOREIGN KEY (RoleID)
	REFERENCES roles(RoleID),
  DeptID INT,
  CONSTRAINT dept
  FOREIGN KEY (DeptID)
	REFERENCES departments(DeptID),
  Salary INT NULL,
  Manager VARCHAR(30) NULL
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

INSERT INTO personnel (First_name, Last_name, RoleID, DeptID, Salary, Manager)
VALUES ("Bugs", "Bunny", 1, 1, 25000, NULL);

INSERT INTO personnel (First_name, Last_name, RoleID, DeptID, Salary, Manager)
VALUES ("Elmer", "Fudd", 2, 2, 2000, NULL);

INSERT INTO personnel (First_name, Last_name, RoleID, DeptID, Salary, Manager)
VALUES ("Daffy", "Duck", 3, 1, 15000, "Bugs Bunny");

-- INSERT INTO personnel (First_name, Last_name, Title, Department, Salary, Manager)
-- VALUES ("Bugs", "Bunny", 1, "Good Guys", 25000, NULL);

-- INSERT INTO personnel (First_name, Last_name, Title, Department, Salary, Manager)
-- VALUES ("Bugs", "Bunny", 1, "Good Guys", 25000, NULL);

-- INSERT INTO personnel (First_name, Last_name, Title, Department, Salary, Manager)
-- VALUES ("Bugs", "Bunny", 1, "Good Guys", 25000, NULL);

-- INSERT INTO personnel (First_name, Last_name, Title, Department, Salary, Manager)
-- VALUES ("Bugs", "Bunny", 1, "Good Guys", 25000, NULL);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM personnel;
