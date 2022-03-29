//Encriptar contraseña
const bcryptjs = require("bcryptjs");

//Se requieren los módulos necesarios
const path = require("path");
const fs = require("fs");
const user = require("../models/user");
const express = require ("express");
const { validationResult } = require("express-validator")
const { body } = require("express-validator");

//Se definen las rutas hacia los JSONs
const usersPath = path.join(__dirname, "../data/usersDataBase.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = { 
      register: (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()){
          return res.render("register", { errors: errors.errors, old:req.body});
          }else{ 
          return res.render("register", { data: req.body}); 
        };

      },
      
      processRegister: (req, res) => {
        let userByEmail = user.findByField("email", req.body.email)
      
        if(userByEmail == req.body.email){
          return res.render ("register",{
          errors:{
            email:{
              msg:"Este usuario ya se encuentra registrado"
            }
          },
              oldData:req.body
            }
          )} else {
        let userToCreate = {
        ...req.body,
          password:bcryptjs.hashSync(req.body.password, 10),
          password1:bcryptjs.hashSync(req.body.password1, 10),
        };

        const userCreated = user.create(userToCreate);

        return res.redirect("/user/login")
        };
      },

      login: (req, res)=>{
        return res.render('login');
      },

      loginProcess: (req, res) =>{
        let userToLogin = user.findByField('email', req.body.email)

        if(userToLogin){
          let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
          if(correctPassword){
            req.session.userLogged = userToLogin;
            return res.redirect('/user/profile');            
          }
          return res.render('login', {
            errors: {
              email:{
                msg: 'credenciales inválidas'
              }
            }
          });
        }
      },

      profile: (req, res)=>{
        return res.render('userProfile', {
          user: req.session.userLogged
        });
      },
     
      logout: (req, res) =>{
        req.session.destroy();
        return res.redirect('/');
      },
}

module.exports = controller;