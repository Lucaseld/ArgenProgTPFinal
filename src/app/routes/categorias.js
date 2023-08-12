const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');

module.exports = app=>{
    const conexion = dbConnection();

    
app.get('/categorias',(req,res)=>{
    conexion.query('SELECT * FROM categorias', (err,result)=>{
        if(err){
            console.error('Error recuperando datos de la Base de Datos:',err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        } else {
            console.log(result);
            res.render('categorias.ejs',{
                categorias: result,
            })
        }
    })
});


app.post('/categorias',(req,res)=>{
    const nombre = req.body.nombre;
    conexion.query('INSERT INTO categorias SET ?',{
        nombre
    },(err,result)=>{
        if(err){
            console.error('Error insertando datos en la Base de Datos:',err);
            res.status(500).send('Error insertando datos en la Base de Datos');
        } else {
        res.redirect('/categorias'); 
        }
    })
}); 


app.get('/borrar_categoria/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM categorias WHERE id_categoria = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.log('Error al borrar el registro');
            res.status(500).send('Error al borrar el registro');
        }
        else{
            console.log(req.body);
            console.log('Registro borrado');
            res.redirect('/categorias');
        }
    })
})

app.get('/editar_categoria/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM categorias WHERE id_categoria = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar registro: ',err );
            res.status(500).send('Error al editar el registro');
        }
        else{
            res.render('editar_categoria',{
                categoria:result[0]
            });
            
        }
        })
})

app.post('/editar_categoria/:id',(req,res)=>{
    const id = req.params.id;
    const {nombre} = req.body;
    const query = 'UPDATE categorias SET NOMBRE = ? WHERE id_categoria = ?';
    conexion.query(query,[nombre,id],(err,result)=>{
        if(err){
            console.error('Error al editar registro: ',err );
            res.status(500).send('Error al editar el registro');
        }
        else{
            console.log('Registro editado correctamente');
            res.redirect('/categorias');
            
        }
        })
})

}