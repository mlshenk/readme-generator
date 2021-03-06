// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title} 
[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
## Description  

${data.description}
--------------
## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Licenses](#Licenses)
- [Contributing](#Contributing)
- [Test](#Test)
- [Questions](#Questions)

${data.tableContents}
--------------
## Installation
**These are the installation requirement for this project.**

${data.installation}
--------------
## Licenses
**These are the licenses needed for this project.**

${data.licenseBadge}
--------------
## Contributing
**Below are the Contributing parties to this project, if any.**

${data.contributing}
--------------
## Tests
**Below are the tests performed on this project, and their descriptions.**

${data.tests}
--------------
## Questions

${data.questions}
--------------
## GitHub Profile Avatar
![profile-picture](${data.avatar}=250x)
`;
}

module.exports = generateMarkdown;
