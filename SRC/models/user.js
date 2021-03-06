const { body } = require("express-validator");
const fs = require ("fs");
const path = require ("path");

const user = {
    fileName: path.join(__dirname, "../data/usersDataBase.json"),
    
    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName,"utf-8"));
    },

    generateId: function () {
        let allUsers= this.findAll();
        let lastUser= allUsers.pop();
        if (lastUser){ 
        return lastUser.id + 1;
        }
        return 1;
    },


    findAll: function (){
        return this.getData();
    },

    findByPK: function (id){
        let allUsers= this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound;
    },
    
    findByField: function (field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] == text);
        return userFound;
    },

    findByEmail: function (text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.email == text);
        return userFound;
    },

    create: function(usersData) {

        let allUsers= this.findAll();
        let newUser = {
            id: this.generateId(),
            ...usersData,
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ""))
        return true;
    },

    delete: function(id) {
        let allUsers= this.findAll();
        let finalUser= allUsers.filter(oneUser => oneUser.id !==id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ""))
        return finalUser;
    }, 
};

module.exports = user; 

