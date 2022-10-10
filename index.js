const inquirer = require('inquirer');
const fs = require('fs'); 

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const teamArray = []; 

const generateHTML = require('./src/generateHTML');

// Team Manager prompts 
const addManager = () => {
    return inquirer.prompt ([
      {
        type: 'input', 
        name: 'name', 
        message: "What is the team manager's name?",
        validate: nameInput => {
            if(nameInput) {
                return true;    
            } else {
                console.log("Please enter the team manager's name."); 
                return false; 
      }
    }
 },
    {
        type: 'input', 
        name: 'id', 
        message: "What is the team manager's ID?",
        validate: nameInput => {
          if(isNaN(nameInput)) {
            console.log("Please enter the team manager's ID!")
            return false; 
          }
            else {
              return true; 
            }
        } 
  }, 
    {
      type: 'input', 
      name: 'email', 
      message: "What is the team manager's email?", 
      validate: email => {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if(valid) {
          return true;
        } else {
            console.log ('Please enter a valid email!')
            return false; 
        }
    }
  },
    {
      type: 'input', 
      name: 'officeNumber', 
      message: "What is the team manager's office number?", 
      validate: nameInput => {
        if(isNaN(nameInput)) {
          console.log('Please enter an office number!')
          return false; 
        } else {
          return true; 
        }
      }
    }, 
  ])
  
  .then(managerInput => {
    const  { name, id, email, officeNumber } = managerInput; 
    const manager = new Manager (name, id, email, officeNumber);

    teamArray.push(manager); 
    console.log(manager); 
  })
};

// Type of employee prompts 
const addEmployee = () => {
  return inquirer.prompt ([
  {
      type: 'list',
      name: 'role',
      message: "Please choose your employee's role.",
      choices: ['Engineer', 'Intern']
  },
  {
      type: 'input',
      name: 'name',
      message: "What is the name of the employee?", 
      validate: nameInput => {
        if (nameInput) {
        return true;
        } else {
            console.log ("Please enter an employee's name!");
            return false; 
        }
      }
  },
  {
      type: 'input',
      name: 'id',
      message: "What is the employee's ID?",
      validate: nameInput => {
        if(isNaN(nameInput)) {
          console.log ("Please enter the employee's ID!")
          return false; 
          } else {
            return true;
          }
      }
  },
  {
      type: 'input',
      name: 'email',
      message: "What is the employee's email?",
      validate: email => {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
          if(valid) {
          return true;
          } else {
            console.log ('Please enter a valid email!')
            return false; 
          }
        }
  },
  {
      type: 'input',
      name: 'github',
      message: "What is the employee's github username?",
      when: (input) => input.role === "Engineer",
      validate: nameInput => {
        if(nameInput ) {
        return true;
        } else {
          console.log ("Please enter the employee's github username!")
        }
      }
  },
  {
      type: 'input',
      name: 'school',
      message: "What school did your intern attend?",
      when: (input) => input.role === "Intern",
      validate: nameInput => {
        if(nameInput) {
        return true;
        } else {
          console.log ("Please enter the intern's school name!")
        }
    }
  },
  {
      type: 'confirm',
      name: 'confirmAddEmployee',
      message: 'Would you like to add more team members?',
      default: false
    }
])
    .then(employeeData => {
      let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
      let employee; 

      if(role === "Engineer") {
          employee = new Engineer (name, id, email, github);
          console.log(employee);

      } else if(role === "Intern") {
          employee = new Intern (name, id, email, school);
          console.log(employee);
      }

      teamArray.push(employee); 
      if(confirmAddEmployee) {
          return addEmployee(teamArray); 
      } else {
          return teamArray;
      }
  })
};

// Function to generate HTML page 
const writeFile = data => {
  fs.writeFile('./dist/index.html', data, err => {
      // If there is an error 
      if(err) {
          console.log(err);
          return;
      // When the profile has been created 
      } else {
          console.log("Your team profile has been successfully created! Please check out the index.html file.")
      }
  })
}; 

addManager()
.then(addEmployee)
.then(teamArray => {
  return generateHTML(teamArray);
})
.then(pageHTML => {
  return writeFile(pageHTML);
})
.catch(err => {
console.log(err);
});