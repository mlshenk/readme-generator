var generateMarkdown = require("./utils/generateMarkdown");
var fs = require("fs");
var inquirer = require("inquirer");

var api = require("./utils/api");

var myData = {
    title: "Welcome to my readme",
    name: "Your name"
}
// Array of questions for user
const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "Please enter a description of your project.",
        name: "description"
    },
    {
        type: "confirm",
        message: "Would you like to include a Table of Contents?",
        name: "tableContents"
    },
    {
        type: "input",
        message: "Please enter any installation instructions for your project.",
        name: "installation"
    },
    {
        type: "checkbox",
        message: "Please select any licenses for your project.",
        name: "licenses",
        choices: ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"]
    },
    {
        type: "input",
        message: "Please enter any other contributing parties, if any, for this project.",
        name: "contributing"
    },
    {
        type: "input",
        message: "Did you perform any tests on your project? If so, please describe them.",
        name: "tests"
    },
    {
        type: "input",
        message: "Please enter your email address if you would like to receive questions about your project.",
        name: "questions"
    }
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (error) {
        if (error) throw error;
        console.log("success");
    })
}

// Function to initialize program
function init() {
    inquirer.prompt(
        questions
    ).then(function (response) {
     
   
        let data = { ...response }

        // Available License Badges
        data.licenseBadge = "";
        response.licenses.map(license => {
            
            if(license==="MIT License"){
                data.licenseBadge += "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            } else if (license==="GNU GPLv3"){
                data.licenseBadge += "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            } else if (license==="GNU AGPLv3"){
                data.licenseBadge += "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
            } else if (license==="GNU LGPLv3"){
                data.licenseBadge += "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
            }  else if (license==="Mozilla Public License 2.0"){
                data.licenseBadge += "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            }  else if (license==="Boost Software License 1.0"){
                data.licenseBadge += "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            } else if (license==="The Unlicense"){
                data.licenseBadge += "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            } else (data.licenseBadge = "There are no licenses for this project.")
        });
        
   
        console.log(data.licenseBadge);
        // Displays github profile picture
        api(response.username)
        .then(apiResp => {
            data.avatar = apiResp.data.avatar_url;
            console.log("combined user response & GitHub image" + data.avatar);
            writeToFile("readMe.md", generateMarkdown(data));
        });
    })
}

// Function call to initialize program
init();