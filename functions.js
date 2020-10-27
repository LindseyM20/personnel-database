const connection = require("./connection.js");
const inquirer = require("inquirer");
require("console.table");

console.log("Welcome to Personnel Manager!")
start();
// function which prompts the user for what action they should take
function start() {

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "View all roles", "View all departments", "Add an employee", "Add a new role", "Add a new department", "Update an employee's title", "EXIT"]
    })
    .then(function (answer) {
      // based on their answer, call the functions for what they want to do
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;

        case "View all roles":
          rolesView();
          break;

        case "View all departments":
          departmentsView();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Add a new role":
          addRole();
          break;

        case "Add a new department":
          addDept();
          break;

        case "Update an employee's title":
          updateTitle();
          break;

        case "EXIT":
          connection.end();
          break;
      }
    });
}

async function employeeView() {
  const personnel = await connection.query(
    "SELECT * FROM personnel"
  )
  console.table(personnel);
  start();
}

async function rolesView() {
  const roles = await connection.query(
    "SELECT * FROM roles"
  )
  console.table(roles);
  start();
}

async function departmentsView() {
  const departments = await connection.query(
    "SELECT * FROM departments"
  )
  console.table(departments);
  start();
}

function addEmployee() {
  inquirer
    .prompt([{
      name: "FName",
      type: "input",
      message: "What's the new employee's first name?"
    }, {
      name: "LName",
      type: "input",
      message: "What's the new employee's last name?"
    }, {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: ["CEO", "CFO", "President", "Supporting Character", "OTHER"]
    }, {
      name: "role2",
      type: "input",
      message: "Please enter a role:",
      when: function (answers) {
        return answers.role === "OTHER";
      }
    }, {
      name: "dept",
      type: "list",
      message: "What is the employee's department?",
      choices: ["Good Guys", "Bad Guys", "OTHER"]
    }, {
      name: "dept2",
      type: "input",
      message: "Please enter a department:",
      when: function (answers) {
        return answers.dept === "OTHER";
      }
    }, {
      name: "salary",
      type: "input",
      message: "What is the employee's salary?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("Please enter numbers only, no special characters")
        return false;
      },
    }, {
      name: "manager",
      type: "input",
      message: "Who is the employee's manager?"
    }])
    .then(function (answers) {
      console.log("Adding a new employee...\n");
      let roleNumber;
      switch (answers.role) {
        case ("CEO"):
          roleNumber = 1;
          break;
        case ("CFO"):
          roleNumber = 2;
          break;
        case ("President"):
          roleNumber = 3;
          break;
        case ("Supporting Character"):
          roleNumber = 4;
          break;
        case ("OTHER"):
          console.log("adding a new role...");
          addRole();
          break;
      }
     
      connection.query(
        "INSERT INTO personnel SET ?",
        {
          First_name: answers.FName,
          Last_name: answers.LName,
          RoleID: roleNumber,
          ManagerID: answers.manager
        },
        function (err, answers) {
          if (err)
            throw err;
          console.log(answers.affectedRows + " employee added!\n");
          // Call updateProduct AFTER the INSERT completes
          // updateProduct();
          // start();
        });

      connection.query(
        "INSERT INTO roles SET ?",
        {
          Title: answers.role2
        },
        function (err, answers) {
          if (err)
            throw err;
          console.log(answers.affectedRows + " role data added!\n");
          // Call updateProduct AFTER the INSERT completes
          // updateProduct();
        });

      connection.query(
        "INSERT INTO departments SET ?",
        {
          Department: answers.dept2
        },
        function (err, answers) {
          if (err)
            throw err;
          console.log(answers.affectedRows + " department data added!\n");
          // Call updateProduct AFTER the INSERT completes
          // updateProduct();
        });
      // logs the actual query being run
      // console.log(query3.sql);
    });

}

function addRole() {
  inquirer
    .prompt({
      name: "newRole",
      type: "input",
      message: "What is the new role?"
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          Title: answer.newRole
        },
        function (err, answer) {
          if (err)
            throw err;
          console.log(answer.affectedRows + " new role added!\n");
          // Call updateProduct AFTER the INSERT completes
          // updateProduct();
        });

    })
  // start();
}



function addDept() {
  inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "What is the new department?"
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          Department: answer.newDept
        },
        function (err, answer) {
          if (err)
            throw err;
          console.log(answer.affectedRows + " new department added!\n");
          // Call updateProduct AFTER the INSERT completes
          // updateProduct();
        });

    })
  // start();
}



// function updateTitle() {}

// select * from personnel where DeptID = 4
