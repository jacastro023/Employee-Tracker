var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

// lookupRoles();
// lookupEmployee();

let role = [];
let depts = [];
let manager = [];


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                // "View All Employees By Department",
                // "View All Employees By Manager",
                // "Remove Employee",
                // "Update Employee Manager",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    AllEmployees();
                    break;
                case "View All Departments":
                    Departments();
                    break;

                // case "View All Employees By Department":
                //     ByDepartment();
                //     break;

                // case "View All Employees By Manager":
                //     ByManager();
                //     break;

                case "Add Employee":
                    AddEmployee();
                    break;

                case "Add Department":
                    AddDepartment();
                    break;

                // case "Remove Employee":
                //     RemoveEmployee();
                //     break;

                case "Update Employee Role":
                    UpdateRole();
                    break;

                // case "Update Employee Manager":
                //     UpdateManager();
                //     break;

                case "View All Roles":
                    Roles();
                    break;

                case "Add Role":
                    AddRoles();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function AllEmployees() {
    connection.query(
        "select * from employee",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            runSearch();
        }
    );
};

function Roles() {
    connection.query("SELECT * FROM role;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();

    });
};

function Departments() {
    connection.query(
        "select * from department",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            runSearch();
        }
    );
}

// function ByDepartment() {
//     inquirer
//         .prompt([
//             {
//                 name: "item",
//                 type: "list",
//                 message: "Employees from which Department would you like to see?",
//                 choices: deptArray
//             }
//         ])
//         .then(function (answer) {
//             console.log(answer.item);

//             connection.query(
//                 "select * from employee where ?",
//                 {
//                     department: answer.item
//                 },
//                 function (err, res) {
//                     if (err) throw err;
//                     console.table(res)
//                     runSearch();
//                 }
//             );
//         });
// };

// function ByManager() { };

function AddEmployee() {
    lookupRoles();
    lookupEmployee();
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?"
        },

        {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?"
        },

        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: role
        },

        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: manager
        }

    ]).then(function (answer) {
        var getRoleId = answer.role.split("-")

        var getmanager = answer.manager.split("-")

        var query =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
           VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getmanager[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
        });
        runSearch();
    });
};


// function RemoveEmployee() { };

function UpdateRole() {
    lookupRoles();
    lookupEmployee();
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "continue?",
            choices: ["yes"]
        },

        {
            name: "employee",
            type: "list",
            message: "which employee would you like to update?",
            choices: manager
        },

        {
            name: "role",
            type: "list",
            message: "What is their new role?",
            choices: role
        }

    ]).then(function (answer) {
        let ID = answer.employee.split(' - ')[0]
        // console.log(ID[0]);

        let newRoleId = answer.role.split(' - ')[0]
        // console.log(newRoleId[0]);

        connection.query(`UPDATE employee SET role_id = ${newRoleId[0]} WHERE ${ID[0]} = employee_id`, function (err, response) {
            if (err) {
                console.log(err)
            }
            console.log("Role Changed");
            runSearch();
        })
    })
};

// function UpdateManager() { };

function AddRoles() {
    lookupDepts();
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the new role's title",
            name: "title"
        },
        {
            type: "input",
            message: "What is the annual salary for this new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "To which department will the new role belong?",
            choices: depts,
            name: "deptChoice"
        },
    ]).then(function (answer) {
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', ${answer.deptChoice.split('-')[0]})`, function (err, response) {
            if (err) {
                console.log(err)
            }
            console.log(`The new role created`);
            runSearch();
        })
    })
};

// function RemoveRole() { };


function AddDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the new Department name?"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO department (department) VALUES (?) ", [answer.department],
                function (err) {
                    if (err) throw err;
                    console.log("Added department to database successfully");
                    runSearch();
                }
            );
        });
}

function lookupRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            role.push((data[i].role_id + "-" + data[i].title));
        }
        return role;
    })
}


function lookupEmployee() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            manager.push((data[i].employee_id + "-" + data[i].first_name + " " + data[i].last_name))
        }
        return manager;
    })
}

function lookupDepts() {
    connection.query("SELECT * FROM department", function (err, data) { 
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            depts.push((data[i].department_id + "-" + data[i].department))
        }
        return depts;
    })
}
