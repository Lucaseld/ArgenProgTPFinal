const { query } = require('express');
const dbConnection = require('../../config/dbConnection');
const { connect } = require('../../config/server');

module.exports = app=>{
    const conexion = dbConnection();

    app.get('/', async (req, res) => {
        try {
            // Consulta para obtener los socios
            const sociosQuery = 'SELECT s.*, p.nombre as provincia, g.genero as genero, c.nombre as categoria FROM socios s left join provincias p on (s.id_provincia = p.id_provincia) left join generos g on (s.id_genero = g.id_genero) left join categorias c on (s.id_categoria=c.id_categoria)';
            const sociosresult = await queryDatabase(sociosQuery);
    
            // Consulta para obtener las provincias
            const provinciasQuery = 'SELECT * FROM provincias';
            const provinciasResult = await queryDatabase(provinciasQuery);

            // Consulta para obtener las generos
            const generosQuery = 'SELECT * FROM generos';
            const generosResult = await queryDatabase(generosQuery);
            
            // Consulta para obtener las categorias
            const categoriasQuery = 'SELECT * FROM categorias';
            const categoriasResult = await queryDatabase(categoriasQuery);
    
            console.log(sociosresult);
            console.log(provinciasResult);
            console.log(generosResult);
            console.log(categoriasResult);
    
            
            res.render('socios.ejs',{
                socios: sociosresult,
                provincias: provinciasResult,
                generos: generosResult,
                categorias: categoriasResult,
            });
        } catch (err) {
            console.error('Error recuperando datos de la Base de Datos:', err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        }
    });

    app.get('/alta_socio', async (req, res) => {
        try {
    
            // Consulta para obtener las provincias
            const provinciasQuery = 'SELECT * FROM provincias';
            const provinciasResult = await queryDatabase(provinciasQuery);

            // Consulta para obtener las generos
            const generosQuery = 'SELECT * FROM generos';
            const generosResult = await queryDatabase(generosQuery);
            
            // Consulta para obtener las categorias
            const categoriasQuery = 'SELECT * FROM categorias';
            const categoriasResult = await queryDatabase(categoriasQuery);


            console.log(provinciasResult);
            console.log(generosResult);
            console.log(categoriasResult);
    
            
            res.render('alta_socio.ejs',{
                provincias: provinciasResult,
                generos: generosResult,
                categorias: categoriasResult,
            });
        } catch (err) {
            console.error('Error recuperando datos de la Base de Datos:', err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        }
    });

    app.get('/',(req,res)=>{
        conexion.query('SELECT * FROM socios', (err,result)=>{
            if (err){
                console.error('Error recuperando datos de la Base de Datos:', err);
                res.status(500).send('Error recuperando datos de la Base de Datos');
            } else{
                console.log(result);
                res.render('socios.ejs', {
                    socios: result,
                });
            }
        });

    });

    app.post('/socios',(req,res)=>{
        //const {nombre , apellido} = req.body;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const fecha_nacimiento = req.body.fecha_nacimiento;
        const id_genero = req.body.generoId;
        const dni = req.body.dni;
        const direccion = req.body.direccion;
        const localidad = req.body.localidad;
        const id_provincia = req.body.provinciaId;
        const telefono = req.body.telefono;
        const email = req.body.email;
        const fecha_alta = new Date(Date.now());
        const id_categoria = req.body.categoriaId;
        conexion.query('INSERT INTO socios SET ?',{
            nombre,
            apellido,
            fecha_nacimiento,
            id_genero,
            dni,
            direccion,
            localidad,
            id_provincia,
            telefono,
            email,
            fecha_alta,
            id_categoria
        },(err,result)=>{
            console.log(nombre);
            console.log(apellido);
            console.log(fecha_nacimiento);
            console.log(id_genero);
            console.log(dni);
            console.log(direccion);
            console.log(localidad);
            console.log(id_provincia);
            console.log(telefono);
            console.log(email);
            console.log(id_categoria);
            console.log(req.body);
            res.redirect('/');
        }
        )

    }); 
    


    app.get('/borrar_socio/:id',(req,res)=>{
        const id = req.params.id;
        const query = 'DELETE FROM socios WHERE id_socio = ?';
        conexion.query(query,[id],(err,result)=>{
            if(err){
                console.log('Error al borrar el registro');
                res.status(500).send('Error al borrar el registro');
            }
            else{
                console.log(req.body);
                console.log('Registro borrado');
                res.redirect('/');
            }
        })
    })   
    
    app.get('/editar_socio/:id', async(req,res)=>{
        try{

            const id = req.params.id;
            const socioQuery = 'SELECT id_socio, nombre,apellido, DATE_FORMAT(fecha_nacimiento, "%d-%c-%Y") as fecha_nacimiento,fecha_nacimiento,id_genero,direccion,localidad,id_provincia,telefono,email,id_categoria FROM socios where id_socio =' + id;
            const socioResult = await queryDatabase(socioQuery);

            // Consulta para obtener las provincias
            const provinciasQuery = 'SELECT * FROM provincias';
            const provinciasResult = await queryDatabase(provinciasQuery);

            // Consulta para obtener las generos
            const generosQuery = 'SELECT * FROM generos';
            const generosResult = await queryDatabase(generosQuery);
            
            // Consulta para obtener las categorias
            const categoriasQuery = 'SELECT * FROM categorias';
            const categoriasResult = await queryDatabase(categoriasQuery);
    
            console.log(socioResult);
            console.log(provinciasResult);
            console.log(generosResult);
            console.log(categoriasResult);

            res.render('editar_socio.ejs', {
                socio: socioResult,
                provincias: provinciasResult,
                generos: generosResult,
                categorias: categoriasResult,
            });
            
        }
        catch(err){

            console.error('Error recuperando datos de la Base de Datos:', err);
            res.status(500).send('Error recuperando datos de la Base de Datos');
        }
    })
    app.    post('/editar_socio/:id',(req,res)=>{
        const id = req.params.id;
        const {nombre} = req.body;
        const {apellido} = req.body;
        const {fecha_nacimiento} = req.body;
        const id_genero = req.body.generoId;
        const {dni} = req.body;
        const {direccion} = req.body;
        const {localidad} = req.body;
        const id_provincia = req.body.provinciaId;
        const {telefono} = req.body;
        const {email} = req.body.email;
        const id_categoria = req.body.categoriaId;
        const query = 'UPDATE socios SET nombre = ? , apellido= ? , fecha_nacimiento = ? , id_genero = ?, dni = ?, direccion = ?, localidad = ? , id_provincia = ?, telefono = ?, email = ? , id_categoria = ? WHERE id_socio = ?';
        conexion.query(query,[nombre,apellido,fecha_nacimiento,id_genero,dni,direccion,localidad,id_provincia,telefono,email,id_categoria,id],(err,result)=>{
            if(err){
                console.error('Error al editar registro: ',err ,query);
                res.status(500).send('Error al editar el registro');
            }
            else{
                console.log('Registro editado correctamente');
                res.redirect('/');

            }
            })
    })

    app.post('/editar',(req,res)=>{
        const id = req.body.registroId;
        const {nombre , apellido} = req.body;
        const query = 'UPDATE socios SET nombre = ? , apellido = ? where id_socio = ?';
        conexion.query(query,[nombre,apellido,id],(err,result)=>{
            if(err){
                console.error('Error al editar registro: ',err );
                res.status(500).send('Error al editar el registro');
            }
            else{
                console.log(req.body);
                console.log('Registro editado correctamente');
                res.redirect('/');
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
