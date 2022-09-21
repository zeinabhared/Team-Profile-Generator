const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern'); 

const fs = require('fs'); 
const inquirer = require('inquirer');

const teamArray = []; 