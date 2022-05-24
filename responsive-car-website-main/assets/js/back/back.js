
var express = require('express');
var bodyParser = require("body-parser");
const path = require("path");
const { json } = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





var mysql = require('mysql');
const req = require('express/lib/request');

var jwt = require('jsonwebtoken');
const { decode } = require('punycode');
require('dotenv').config();




var con = mysql.createConnection({
    host: "localhost",
    user: "miguel",
    password: "password",
    database: "elecar"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



function seleccionaUsuario(email,password){
    
    return new Promise ((resolve, reject)=>{
        let sql = con.query('SELECT * FROM `users` WHERE `email` = ? AND `password` = ?', [email, password],(err, result)=>{
            if (err) reject(err);
            
            resolve(result);
        });
       
    });


}


function generateAccesToken(user){

    return jwt.sign(user, process.env.SECRET, {expiresIn: '5m'});

}


app.get('/users/:email/:password', async (req, res) => {
    
    let user = req.params;
    let email = user.email;
    let password = user.password


    try{
    /*
    con.query('SELECT * FROM `users` WHERE `email` = ? AND `password` = ?', email, password ,(err, result)=>{
        if (err) throw err;
      
        res.json({result});

        console.log(result); 
        return result
    });
    */
   
        let result = await seleccionaUsuario(email, password);
        
        const accesToken = generateAccesToken(user);

        

        res.json({result,
            token: accesToken
        });
        /*res.header('autorizacion', accesToken).json({
            message: 'usuario autenticado',
            token: accesToken
            }); */

    } catch(err){
        
            res.status(400).send('No se ha podido mostrar el usuario');
      
    }
    
})  


app.post('/users', (req, res) => {
    
    let user = req.body;
   
    con.query('INSERT INTO users SET ?', user ,(err, result)=>{
        
        if(err){
           
            res.status(400).send('No se ha podido insertar el nuevo usuario');
        
            return 
        }
        res.json({user});
        

       
    });
   
   
});



app.get('/cars', (req,res) =>{
    let car = req.body;
    
    let query = con.query('SELECT coches.id, modelo, nombre, precio, fotos  FROM coches INNER JOIN marcas ON coches.marca_id = marcas.id' ,(err, result)=>{
        if (err) res.status(400).send('No se ha podido mostrar los coches');
        
        
        res.json({result});

       
        return result
    });
   
    



});



app.get('/marcas', (req,res) =>{
    let marca = req.body;
    
    let query = con.query('SELECT * FROM marcas' ,(err, result)=>{
        if (err) res.status(400).send('No se ha podido mostrar los logos');
        
        
        res.json({result});

        
        return result
    });
   
    



});




app.get('/marcas/:id', (req,res) =>{
    let marca = req.body;
    let id = req.params.id;
    
    let query = con.query('SELECT  modelo, nombre, precio, fotos  FROM coches INNER JOIN marcas ON coches.marca_id = marcas.id WHERE marca_id=?', id ,(err, result)=>{
        if (err){
            console.log(err);
            res.status(400).send('No se ha podido mostrar los logos');
            return
        }
        
        res.json({result});

       
        
    });
   
    


});




app.post('/users/favoritos', (req, res) => {
    console.log('RUTA ADD FAVORITOS');
    let favoritos = req.body;
    console.log(favoritos);
    con.query('INSERT INTO favoritos SET ?', favoritos ,(err, result)=>{
        
        if(err){
           //console.log(err);
            res.status(400).send('No se ha podido insertar el coche en favoritos');
        
            return 
        }
        res.json({id: result.insertId});
        

        console.log(result);
        //return result
    });
   
   
});


app.get('/favoritos/:id', (req,res) =>{
    
    console.log('RUTA GET FAVORITOS');
    let id = req.params.id;
    console.log('ID: '+id);
    let query = con.query('SELECT id, coche_id FROM favoritos WHERE usuario_id = ?', id,(err, result)=>{
        if (err){
            console.log('ERROR: '+err);
            res.status(400).send('No se ha podido mostrar los logos favoritos');
            
            
            return
        }
        console.log('REsult: '+result);
        res.json({result});

        
        return result
    });
    
   
});


app.delete('/users/favoritos/delete/:id/:coche_id',(req, res)=> {
    console.log('RUTA DELETE FAVORITOS');
    let favoritos = req.params;
    let id = favoritos.id;
    let coche_id = favoritos.coche_id;

    let query = con.query('DELETE FROM `favoritos` WHERE id =? AND coche_id = ? ', [id,coche_id] ,(err, result)=>{
        if (err) throw err;
      
        
        res.json({result});

        console.log(result); 
        return result
    });
   
    console.log(query.sql);
    
  });



app.listen(3000,() => {
    console.log('Servidor corriendo')
});