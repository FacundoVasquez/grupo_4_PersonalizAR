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


//base de datos

const db = require("../../database/models")

const controller = { 
      register: (req, res) => {
        return res.render("register")
      },

      processRegister: async(req, res) => {


        await db.User.create({
          name:'req.body.user_name',
          email:'req.body.email',
          password:'req.body.password',
        })
        return res.redirect ("/user/login")
      },
     
        /* let errors = validationResult(req);
  
          if (!errors.isEmpty()) {
          
              return res.render("register", { errors: errors.errors, oldData:req.body});
              //return res.send(errors.errors);
              
  
          }else { 
  
               let userByEmail = user.findByEmail(req.body.email);
        
               if(userByEmail !== undefined) {
                const errorEmail = [{"value":"","msg":"Usuario Registrado","param":"email","location":"body"}];
                return res.render ("register", {errors: errorEmail, oldData:req.body});
              }  else {

                let userToCreate = {
                     ...req.body,
                 
                     password:bcryptjs.hashSync(req.body.password, 10),
                     password1:bcryptjs.hashSync(req.body.password1, 10),
                 }
   
                 let userCreated = user.create(userToCreate);
                 return res.redirect ("/user/login")
                 }}}, */

      login: (req, res)=>{
        return res.render('login');
      },

      loginProcess: (req, res) =>{
        let userToLogin = user.findByField('email', req.body.email);

        if(userToLogin){
          let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
          if(correctPassword){
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
          if(req.body.remember_user){
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60)*2})
          }
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
     
      logout: (req, res)=> {
        req.session.userLogged=null;
        res.cookie('userEmail', null, {maxAge:-1})
        return res.redirect('/')
        req.session.destroy(()=> {
        req.session = null

        });
      }
          
}

module.exports = controller;