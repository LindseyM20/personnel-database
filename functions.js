const connection = require("./connection.js");
const inquirer = require("inquirer");
const util = require("util");
require("console.table");

connection.query = util.promisify(connection.query);

console.log("Welcome to Personnel Manager!")
start();
// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "View all roles", "View all departments", "Add an employee", "Add a new role", "Add a new department", "Update a role", "EXIT"]
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

        case "Update a role":
          updateRole();
          break;

        case "EXIT":
        default:
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
  inquirer.prompt([
    {
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
      choices: [
        { name: "CEO", value: 1 },
        { name: "CFO", value: 2 },
        { name: "President", value: 3 },
        { name: "Protagonist", value: 4 },
        { name: "Antagonist", value: 5 },
        { name: "OTHER", value: 6 }]
    }, {
      name: "manager",
      type: "input",
      message: "Who is the employee's manager?\nEnter 1 for 'Bugs Bunny'\nEnter 2 for 'Elmer Fudd'\nEnter 3 for 'Daffy Duck'\n"
    }])
    .then(function (answers) {
      console.log("Adding a new employee...\n");

      if (answers.role !== "OTHER") {
        connection.query(
          "INSERT INTO personnel SET ?",
          {
            First_name: answers.FName,
            Last_name: answers.LName,
            RoleID: answers.role,
            ManagerID: answers.manager
          },
          function (err, answers) {
            if (err)
              throw err;
            console.log(answers.affectedRows + " employee added!\n");
          });
      } else {
        addRoleWithEmployee();
        connection.query(
          "INSERT INTO personnel SET ?",
          {
            First_name: answers.FName,
            Last_name: answers.LName,
            RoleID: newRole,
            ManagerID: answers.manager
          },
          function (err) {
            if (err)
              throw err;
          });
      };
    })
    .then(() => {
      console.log(`Added employee to the database`);
      start();
    })
}


async function addRoleWithEmployee() {
  const role = await inquirer
    .prompt([{
      name: "newRole",
      type: "input",
      message: "What is the title of the new role?"
    }, {
      name: "newRoleSal",
      type: "input",
      message: "What is the new role's salary?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("\nPlease enter numbers only, no special characters")
        return false;
      },
    }, {
      name: "newRoleDept",
      type: "input",
      message: "Which department is the new role in?\nEnter 1 for 'Good Guys'\nEnter 2 for 'Bad Guys'\n"
    }])
  // .then(function (answer) {
  await connection.query(
    "INSERT INTO roles SET ?",
    {
      Title: role.newRole,
      Salary: role.newRoleSal,
      DeptID: role.newRoleDept
    },

    function (err, role) {

      if (err)
        throw err;
      console.log(`${role.affectedRows} new role added!\n`);
      const newRole = role.newRole;
      return newRole;
    });

}

async function addRole() {
  const role = await inquirer
    .prompt([{
      name: "newRole",
      type: "input",
      message: "What is the title of the new role?"
    }, {
      name: "newRoleSal",
      type: "input",
      message: "What is the new role's salary?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("\nPlease enter numbers only, no special characters")
        return false;
      },
    }, {
      name: "newRoleDept",
      type: "input",
      message: "Which department is the new role in?\nEnter 1 for 'Good Guys'\nEnter 2 for 'Bad Guys'\n"
    }])
  // .then(function (answer) {
  await connection.query(
    "INSERT INTO roles SET ?",
    {
      Title: role.newRole,
      Salary: role.newRoleSal,
      DeptID: role.newRoleDept
    },

    function (err, role) {
      if (err)
        throw err;
      console.log(`${role.affectedRows} new role added!\n`);
      start();
    });

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
        });
      start();
    })

}



async function updateRole() {

  const updatedRole = await inquirer
    .prompt([{
      name: "chosenRole",
      type: "list",
      message: "Which role would you like to update?",
      choices: [
        { name: "CEO", value: 1 },
        { name: "CFO", value: 2 },
        { name: "President", value: 3 },
        { name: "Protagonist", value: 4 },
        { name: "Antagonist", value: 5 },
        { name: "EXIT", value: null }]
    }, {
      name: "selectProperty",
      type: "list",
      message: "Which property of this role would you like to update?",
      choices: ["Title", "Salary", "Department"]
    }, {
      name: "titleChange",
      type: "input",
      message: "Please type a new title for this role:",
      when: function (answers) {
        return answers.selectProperty === "Title";
      }
    }, {
      name: "salaryChange",
      type: "input",
      message: "Please type a new salary for this role:",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("\nPlease enter numbers only, no special characters")
        return false;
      },
      when: function (answers) {
        return answers.selectProperty === "Salary";
      }
    }, {
      name: "deptChange",
      type: "input",
      message: "Please choose a new department for this role:",
      choices: ["Good Guys", "Bad Guys"],
      when: function (answers) {
        return answers.selectProperty === "Department";
      }
    }
    ]);

  switch (updatedRole.selectProperty) {
    case "Title":
      updateTitle();
      break;

    case "Salary":
      updateSalary();
      break;

    case "Department":
      updateDept();
      break;

    default:
      break;
  }

  function updateTitle(updatedRole) {
    connection.query(
      "UPDATE roles SET ? WHERE ?",
      [
        {Title: updatedRole.titleChange},
        {RoleID: updatedRole.chosenRole}
      ],
      function (err, updatedRole) {
        if (err) throw err;
        console.log(updatedRole.affectedRows + " role updated!\n");
      }
    );
  }

  // function updateTitle(updatedRole) {
  //   connection.query(
  //     "UPDATE roles SET ? WHERE ?",
  //     [
  //       {Title: updatedRole.titleChange},
  //       {RoleID: updatedRole.chosenRole}
  //     ],
  //     function (err, updatedRole) {
  //       if (err) throw err;
  //       console.log(updatedRole.affectedRows + " role updated!\n");
  //     }
  //   );
  // }
}
