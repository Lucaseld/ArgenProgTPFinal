const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');

module.exports = app=>{
    const conexion = dbConnection();
   
app.get('/generos',(req,res)=>{
    conexion.query('SELECT * FROM generos', (err,result)=>{
        if(err){
            console.error('Error recuperando datos de la Base de Datos:',err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        } else {
            console.log(result);
            res.render('generos.ejs',{
                generos: result,
            })
        }
    })
});

app.post('/generos',(req,res)=>{
    const genero = req.body.genero;
    conexion.query('INSERT INTO generos SET ?',{genero},(err,result)=>{
        if(err){
            console.error('Error insertando datos en la Base de Datos:',err);
            res.status(500).send('Error insertando datos en la Base de Datos');
        } else {
        res.redirect('/generos'); 
        }
    })
}); 

app.get('/borrar_genero/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM generos WHERE id_genero = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.log('Error al borrar el registro');
            res.status(500).send('Error al borrar el registro');
        }
        else{
            console.log(req.body);
            console.log('Registro borrado');
            res.redirect('/generos');
        }
    })
})

app.get('/editar_genero/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM generos WHERE id_genero = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar registro: ',err );
            res.status(500).send('Error al editar el registro');
        }
        else{
            res.render('editar_genero',{
                genero:result[0]
            });
            
        }
        })
})

app.post('/editar_genero/:id',(req,res)=>{
    const id = req.params.id;
    const {genero} = req.body;
    const query = 'UPDATE generos SET genero = ? WHERE id_genero = ?';
    conexion.query(query,[genero,id],(err,result)=>{
        if(err){
            console.error('Error al editar registro: ',err );
            res.status(500).send('Error al editar el registro');
        }
        else{
            console.log('Registro editado correctamente');
            res.redirect('/generos');
            
        }
        })
})}