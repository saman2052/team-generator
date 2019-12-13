const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const HTMLRenderer = require("./lib/htmlRenderer");

const axios = require("axios");
const Inquirer = require("inquirer");
const Jest = require("jest");
const path = require("path");
const fs = require("fs");

let employeeInfo = [];
let managerArr = [];
let engineerArr = [];
let internArr = [];

const userChoices = [
    {
        type: "list",
        message: "Would you like to: ",
        name: "userChoices",
        choices: [
            "Add an employee?",
            "Create a Team HTML page?"
        ]
    }
] 

const userQuestions = [
    {
        type:"input",
        message: "Welcome, what's your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What's your ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What's your email?",
        name: "email"
    },
    {
        type: "confirm",
        message: "Are you a manager?",
        name: "position",
        choices: [
            "Yes",
            "No"
        ]
    }
];

const questions = [
    {
        type: "input",
        message: "What's the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What's the employee's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What's the employee's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What's the employee's title?",
        name: "role",
        choices: [
            "Engineer",
            "Intern"
        ]

    }
];

const managerQuestion = [
    {
        type: "input",
        message: "What's your office phone number?",
        name: "officeNumber"
    }
];

const engineerQuestion = [
    {
        type: "input",
        message: "What's the engineer's GitHub username?",
        name: "github"
    }
];

const internQuestion = [
    {
        type: "input",
        message: "What's the intern's school?",
        name: "school"
    }
];

let start = 
    async function userStart() {
        await Inquirer
        .prompt(userQuestions)
        .then(async function(userData) {
            let managerInfo = {
                "name": userData.name,
                "id": JSON.parse(userData.id),
                "email": userData.email,
                "role": "Manager",
                "officeNumber": "",
                "github": "",
                "school": "",


            }
            if(position = true) {
                employeeInfo.push(managerInfo)
                newEmp()
            }
        })
    }  



let input = 
    async function init() {
        await Inquirer
        .prompt(questions)
        .then(async function(userData) {
            let userInfo = {
                "name": userData.name,
                "id": JSON.parse(userData.id),
                "email": userData.email,
                "role": userData.title,
                "officeNumber": "",
                "github": "",
                "school": ""
            }
            employeeInfo.push(userInfo)
            newEmp()
        })
    };

    let next = 
    async function userNext() {
        await Inquirer
        .prompt(userChoices)
        .then(async function(answers) {
            if (answers.userchoice === "Add an employee?") {
                employeeInfo.length = 0;
                input()
            }
            if (answers.userchoice === "Create a Team HTML page?") {
                createTeam()
            }
        })
    };

let newEmp = 
    async function employeeProfile() {
        const name = employeeInfo[0].name;
        const id = employeeInfo[0].id;
        const email = employeeInfo[0].email;
        const role = employeeInfo[0].role;

        const employee = new Employee(name, id, email, role)
        classDir()
    };

let classDir = 
    async function byTitle() {
        if (employeeInfo[0].role === "manager") {
            createManager()
        }
        if (employeeInfo[0].role === "engineer") {
            createEnginner()
        }
        if (employeeInfo[0].role === "intern") {
            createIntern()
        }
    };

async function createManager() {
    await Inquirer
    .prompt(managerQuestion)
    .then(async function(userData) {
        let managerInfo = {
            "officeNumber": JSON.parse(userData.officeNumber)
        }
        employeeInfo[0].officeNumber = managerInfo.officeNumber;

        const name = employeeInfo[0].name;
        const id = employeeInfo[0].id;
        const email = employeeInfo[0].email;
        const role = employeeInfo[0].role;
        const officeNumber = employeeInfo[0].officeNumber;

        const manager = new Manager(name, id, email, officeNumber)
        managerArr.push(manager);
    })

    next()
};

async function createEngineer() {
    await Inquirer
    .prompt(engineerQuestion)
    .then(async function(userData) {
        let engineerInfo = {
            "github": userData.github
        }
        employeeInfo[0].github = engineerInfo.github;

    })

    const name = employeeInfo[0].name;
    const id = employeeInfo[0].id;
    const email = employeeInfo[0].email;
    const role = employeeInfo[0].role;
    const github = employeeInfo[0].github;

    const engineer = new Engineer(name, id, email, github)
    engineerArr.push(engineer);

    next()
};

async function createIntern() {
    await Inquirer
    .prompt(internQuestion)
    .then(async function(userData) {
        let internInfo = {
            "school": userData.school
        }
        employeeInfo[0].school = internInfo.school;
    })

    const name = employeeInfo[0].name;
    const id = employeeInfo[0].id;
    const email = employeeInfo[0].email;
    const role = employeeInfo[0].role;
    const school = employeeInfo[0].school;

    const intern = new Intern(name, id, email, school)
    internArr.push(intern);

    next()
};

createTeam =
    async function teamHTML() {
        fs.writeFileSync("./templates/main.html");

    for (i = 0; i < managerArr.length; i++) {
        fs.appendFileSync("./templates/main.html");
    };

    for (i = 0; i < engineerArr.length; i++) {
        fs.appendFileSync("./templates/main.html");
    };

    for (i = 0; i < internArr.length; i++) {
        fs.appendFileSync("./templates/main.html");
    };
};



start()
