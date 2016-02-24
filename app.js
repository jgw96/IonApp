"use strict";

const remote = require('remote');
const dialog = remote.require('dialog');
const fs = require('fs');
const exec = require('child_process').exec;

let projectPath;

document.querySelector(".sk-double-bounce").style.display = "none";

const openFile = () => {
    dialog.showOpenDialog({properties: ["openDirectory"]}, (fileNames) => {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];
        projectPath = fileName;
        
        document.querySelector("#directoryPath").textContent = projectPath;
    });
};

const runCommand = () => {
    let command = document.querySelector("#commandSelect").value;
    
    if (projectPath === null) {
        alert("You must select an ionic project first");
    }
    
    document.querySelector("#commandIRan").textContent = command;
    
    document.querySelector(".sk-double-bounce").style.display = "block";
    exec(command, {cwd: projectPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
        }
    });
    
    setTimeout(() => {
        document.querySelector(".sk-double-bounce").style.display = "none";
    }, 8000);
};


document.querySelector("#runCommand").addEventListener("click", () => {
    runCommand();
});

document.querySelector("#openFile").addEventListener("click", () => {
    openFile();
});

