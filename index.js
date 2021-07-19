const fs = require('fs');
const inquirer = require('inquirer');

const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Employee = require('./lib/Employee');
const path = require('path');



function getManager() {
    console.log("It's time to make your drream team!");

    inquirer
        .prompt ([
            {  
                type: "name",
                name: "managerName",
                message: "Please enter the Manager's name",
                validate: answer => {
                    if (answer === '') {
                        console.log("Please enter a valid Manager's name!");
                        return false;
                    }
                    return true;
                }
            },
            {
                type: "number",
                name: "managerId",
                message: "Please enter Manager's ID",
                validate: answer => {
                    if (answer < 0) {
                        console.log("Please enter a valid Manager's ID!");
                        return false;
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is Manager's email?",
                validate: answer => {
                    let answerEmail = answer.match(/\S+@\S+\.\S+/);
                    if (answerEmail) {
                        return true;
                    }
                    console.log("Please enter a valid email address!");
                    return false;
                }

            },
            {
                type: "number",
                name: "managerOfficeNumber",
                message: "Please enter the Manager's office number",
                validate: answer => {
                    if (answer < 0) {
                        console.log("Please enter a valid office number!");
                        return false;
                    }
                    return true;
                }
            }     
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            team.push(manager);
            addTeam();
        });
};

function addTeam() {
    inquirer
        .prompt([{ 
            type: 'list',
            name: 'employeeRole',
            message: 'Do you want to add another team member?',
            choices: ['Engineer', 'Intern', 'No, my team is complete']
        }])
        .then(chosen => {
            switch (chosen.employeeRole) {
                case 'Engineer': 
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                case 'No, my team is complete':
                    buildTeam();
                    break;
            }
        });
};

function addEngineer() {
    inquirer
        .prompt ([
        {
            type: 'input',
            name: 'engineerName',
            message: 'Enter the name of your Engineer',
            validate: answer => {
                if (answer === '') {
                    console.log("Please enter a valid Engineer's name!");
                    return false;
                }
                return true;
            }
        },
        {
            type: "number",
            name: "engineerId",
            message: "Please enter Engineer's ID",
            validate: answer => {
                if (answer < 0) {
                    console.log("Please enter a valid Engineer's ID!");
                    return false;
                }
                return true;
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is Engineer's email?",
            validate: answer => {
                let answerEmail = answer.match(/\S+@\S+\.\S+/);
                if (answerEmail) {
                    return true;
                }
                console.log("Please enter a valid email address!");
                return false;
            }

        },
        {
            type: "input",
            name: "engineerGitHub",
            message: "What is Engineer's GitHub?",
            validate: answer => {
                if (answer === '') {
                    return true;
                }
                console.log("Please enter a valid GitHub account!");
                return false;
            }

        }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
            team.push(engineer);
            addTeam();
        });
};

function addIntern() {
    inquirer
        .prompt ([
            {
                type: "input",
                name: "internName",
                message: "What is Inter's name?",
                validate: answer => {
                    if (answer === '') {
                        console.log("Please enter a valid name!");
                        return false;
                    }
                    return true;
                }

            },
            {
                type: "number",
                name: "internID",
                message: "What is Inter's ID?",
                validate: answer => {
                    if (answer < 0) {
                        console.log("Please enter a valid ID!");
                        return false;
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is Inter's email?",
                validate: answer => {
                    if (answer === '') {
                        console.log("Please enter a valid email!");
                        return false;
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is Inter's school?",
                validate: answer => {
                    if (answer === '') {
                        console.log("Please enter a valid school!");
                        return false;
                    }
                    return true;
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            team.push(intern);
            addTeam();
        })
};

function buildTeam() {
    fs.writeFile('./dist/index.html', renderPage(team), 'UTF-8');
}

getManager();