const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');

module.exports = app=>{
    const conexion = dbConnection();
    
app.get('/carga',(req,res)=>{
    conexion.query('SELECT * FROM provincias', (err,result)=>{
        if(err){
            console.error('Error recuperando datos de la Base de Datos:',err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        } else {
            console.log(result);
            res.render('carga.ejs',{
                provincias: result,
            })
        }
    })
});
    
app.post('/provincias',(req,res)=>{
    const nombre = req.body.nombre;
    conexion.query('INSERT INTO provincias SET ?',{
        nombre
    },(err,result)=>{
        if(err){
            console.error('Error insertando datos en la Base de Datos:',err);
            res.status(500).send('Error insertando datos en la Base de Datos');
        } else {
        res.redirect('/carga'); 
        }
    })
}); 

app.get('/borrar_provincia/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM provincias WHERE id_provincia = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.log('Error al borrar el registro');
            res.status(500).send('Error al borrar el registro');
        }
        else{
            console.log(req.body);
            console.log('Registro borrado');
            res.redirect('/carga');
        }
    })
})

app.get('/editar_provincia/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM PROVINCIAS WHERE ID_PROVINCIA = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar registro: ',err );
            res.status(500).send('Error al editar el registro');
        }
        else{
            console.log('Registro editado correctamente');
            res.render('editar_provincias',{
                provincia:result[0]
            });
            
        }
        })
})

app.post('/editar_provincia/:id',(req,res)=>{
    const id = req.params.id;
    const {nombre} = req.body;
    const query = 'UPDATE PROVINCIAS SET NOMBRE = ? WHERE ID_PROVINCIA = ?';
    conexion.query(query,[nombre,id],(err,result)=>{
        if(err){
            console.error('Error al editar registro: ',err );
            res.status(500).send('Error al editar el registro');
        }
        else{
            console.log('Registro editado correctamente');
            res.redirect('/carga');
            
        }
        })
})

}
