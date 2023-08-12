const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');

module.exports = app=>{
    const conexion = dbConnection();

    app.get('/prestamos', async (req, res) => {
        try {
            // Consulta para obtener los socios
            const prestamosQuery = 'SELECT p.*, l.titulo , e.observacion, s.nombre as nombre_socio , s.apellido as apellido_socio FROM PRESTAMOS P LEFT JOIN libros l on (p.id_libro = l.id_libro)  LEFT JOIN ejemplares e on (p.id_ejemplar = e.id_ejemplar) left join socios s on (p.id_socio = s.id_socio)';
            const prestamosResult = await queryDatabase(prestamosQuery);

            
            // Consulta para obtener las provincias
            const librosQuery = 'SELECT * FROM libros';
            const librosResult = await queryDatabase(librosQuery);

            // Consulta para obtener las generos
            const sociosQuery = 'SELECT * FROM socios';
            const sociosResult = await queryDatabase(sociosQuery);
            
            // Consulta para obtener las categorias
            const ejemplaresQuery = 'SELECT * FROM ejemplares e where not exists (select 1 from prestamos p where e.id_ejemplar = p.id_ejemplar and (p.estado!=1 or estado is null))';
            const ejemplaresResult = await queryDatabase(ejemplaresQuery);

    
            console.log(prestamosResult);
            console.log(librosResult);
            console.log(sociosResult);
            console.log(ejemplaresResult);
    
            
            res.render('prestamos.ejs',{
                prestamos: prestamosResult,
                libros: librosResult,
                socios: sociosResult,
                ejemplares: ejemplaresResult,
            });
        } catch (err) {
            console.error('Error recuperando datos de la Base de Datos:', err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        }
    });

    

    app.post('/alta_prestamo',(req,res)=>{
        //const {nombre , apellido} = req.body;
        const id_libro = req.body.libroId;
        const id_ejemplar = req.body.ejemplarId;
        const id_socio = req.body.socioId;
        const fecha_retiro = new Date(Date.now());
        const estado = 0;
        conexion.query('INSERT INTO prestamos SET ?',{
            id_libro,
            id_ejemplar,
            id_socio,
            fecha_retiro,
            estado
        },(err,result)=>{
            console.log(id_libro);
            console.log(id_ejemplar);
            console.log(id_socio);
            console.log(fecha_retiro);
            res.redirect('/prestamos');
        }
        )

    }); 
    


    app.get('/terminar_prestamo/:id',(req,res)=>{
        const id = req.params.id;
        const fecha_entrega = new Date(Date.now());
        
        const query = 'update prestamos set fecha_entrega = ? , estado = 1 where id_prestamo = ?';
        conexion.query(query,[fecha_entrega,id],(err,result)=>{
            if(err){
                console.log('Error al modificar el registro ');
                res.status(500).send('Error al modificar el registro');
            }
            else{
                console.log(req.body);
                console.log('Registro modificado');
                res.redirect('/prestamos');
            }
        })
    })   
    app.get('/extender_prestamo/:id',(req,res)=>{
        const id = req.params.id;
        const Extension1 = req.body.Extension1;
        const diasExtension = 5;
         queryUpdate = null;
        if ( Extension1 == undefined){
             queryUpdate = 'update prestamos set extension1 = ? where id_prestamo = ?';
        }else
        {
            res.redirect('/prestamos');
        }
        
        conexion.query(queryUpdate,[diasExtension,id],(err,result)=>{
            if(err){
                console.log('Error al modificar el registro ' + queryUpdate);
                res.status(500).send('Error al modificar el registro');
            }
            else{
                console.log(req.body);
                console.log('Registro modificado');
                res.redirect('/prestamos');
            }
        })
    })   
    

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
    
}
