const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');
const nacionalidades = require('./nacionalidades');

module.exports = app=>{
    const conexion = dbConnection();



    app.get('/autores', async (req, res) => {
        try {
            // Consulta para obtener los autores
            const autoresQuery = 'SELECT a.id_autor as id_autor, a.nombre as nombre, a.apellido as apellido, n.nombre as nacionalidad FROM autores a, nacionalidades n where a.id_nacionalidad = n.id_nacionalidad';
            const autoresResult = await queryDatabase(autoresQuery);
    
            // Consulta para obtener las nacionalidades
            const nacionalidadesQuery = 'SELECT * FROM nacionalidades';
            const nacionalidadesResult = await queryDatabase(nacionalidadesQuery);
    
            console.log(autoresResult);
            console.log(nacionalidadesResult);
    
            res.render('autores.ejs', {
                autores: autoresResult,
                nacionalidades: nacionalidadesResult,
            });
        } catch (err) {
            console.error('Error recuperando datos de la Base de Datos:', err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        }
    });

    function queryDatabase(sqlQuery) {
        return new Promise((resolve, reject) => {
            conexion.query(sqlQuery, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    app.post('/autores',(req,res)=>{
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const id_nacionalidad = req.body.nacionalidadId;
        conexion.query('INSERT INTO autores SET ?',{
            nombre,
            apellido,
            id_nacionalidad
        },(err,result)=>{
            if(err){
                console.error('Error insertando datos en la Base de Datos:',err);
                res.status(500).send('Error insertando datos en la Base de Datos');
            } else {
            res.redirect('/autores'); 
            }
        })
    }); 


    app.get('/borrar_autor/:id',(req,res)=>{
        const id = req.params.id;
        const query = 'DELETE FROM autores WHERE id_autor = ?';
        conexion.query(query,[id],(err,result)=>{
            if(err){
                console.log('Error al borrar el registro');
                res.status(500).send('Error al borrar el registro');
            }
            else{
                console.log(req.body);
                console.log('Registro borrado');
                res.redirect('/autores');
            }
        })
    })

    app.get('/editar_autor/:id', async(req,res)=>{
        try{

            const id = req.params.id;
            const autorQuery = 'SELECT * FROM autores WHERE id_autor = ' + id;
            const autorResult = await queryDatabase(autorQuery);

            const nacionalidadesQuery = 'SELECT * FROM nacionalidades';
            const nacionalidadesResult = await queryDatabase(nacionalidadesQuery);
    
            console.log(autorResult);
            console.log(nacionalidadesResult);

            res.render('editar_autor.ejs', {
                autor: autorResult,
                nacionalidades: nacionalidadesResult,
            });
            
        }
        catch(err){

            console.error('Error recuperando datos de la Base de Datos:', err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        }
    })

    app.post('/editar_autor/:id',(req,res)=>{
        const id = req.params.id;
        const {nombre} = req.body;
        const {apellido} = req.body;
        const query = 'UPDATE autores SET nombre = ? , apellido= ? WHERE id_autor = ?';
        conexion.query(query,[nombre,apellido,id],(err,result)=>{
            if(err){
                console.error('Error al editar registro: ',err );
                res.status(500).send('Error al editar el registro');
            }
            else{
                console.log('Registro editado correctamente');
                res.redirect('/autores');

            }
            })
    })

}
