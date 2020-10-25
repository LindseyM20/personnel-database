const mysql = require("mysql");
const inquirer = require("inquirer");
// const functions = require("./functions.js")

// creates the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "personnelDB"
});

// connects to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  start();
});

// function which prompts the user for what action they should take
function start() {
  console.log("Welcome to Personnel Manager!")
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "Add an employee", "Update an employee's title", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;
  
        case "Add an employee":
          addEmployee();
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

function employeeView() {}

function addEmployee() {}

function updateTitle() {}

