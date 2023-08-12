const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');

module.exports = app=>{
    const conexion = dbConnection();


    app.get('/nacionalidades',(req,res)=>{
        conexion.query('SELECT * FROM nacionalidades', (err,result)=>{
            if(err){
                console.error('Error recuperando datos de la Base de Datos:',err);
                res.status(500).send('Error recuperando datos de la Base de Datos');
            } else {
                console.log(result);
                res.render('nacionalidades.ejs',{
                    nacionalidades: result,
                })
            }
        })
    });

    
    app.post('/nacionalidades',(req,res)=>{
        const nombre = req.body.nombre;
        conexion.query('INSERT INTO nacionalidades SET ?',{nombre},(err,result)=>{
            if(err){
                console.error('Error insertando datos en la Base de Datos:',err);
                res.status(500).send('Error insertando datos en la Base de Datos');
            } else {
            res.redirect('/nacionalidades'); 
            }
        })
    }); 


    app.get('/borrar_nacionalidad/:id',(req,res)=>{
        const id = req.params.id;
        const query = 'DELETE FROM nacionalidades WHERE id_nacionalidad = ?';
        conexion.query(query,[id],(err,result)=>{
            if(err){
                console.log('Error al borrar el registro');
                res.status(500).send('Error al borrar el registro');
            }
            else{
                console.log(req.body);
                console.log('Registro borrado');
                res.redirect('/nacionalidades');
            }
        })
    })

    app.get('/editar_nacionalidad/:id',(req,res)=>{
        const id = req.params.id;
        const query = 'SELECT * FROM nacionalidades WHERE id_nacionalidad = ?';
        conexion.query(query,[id],(err,result)=>{
            if(err){
                console.error('Error al editar registro: ',err );
                res.status(500).send('Error al editar el registro');
            }
            else{
                res.render('editar_nacionalidad',{
                    nacionalidad:result[0]
                });

            }
            })
    })

    app.post('/editar_nacionalidad/:id',(req,res)=>{
        const id = req.params.id;
        const {nombre} = req.body;
        const query = 'UPDATE nacionalidades SET nombre = ? WHERE id_nacionalidad = ?';
        conexion.query(query,[nombre,id],(err,result)=>{
            if(err){
                console.error('Error al editar registro: ',err );
                res.status(500).send('Error al editar el registro');
            }
            else{
                console.log('Registro editado correctamente');
                res.redirect('/nacionalidades');

            }
            })
    })

}
