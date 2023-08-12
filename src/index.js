const app = require('./config/server');
require('./app/routes/socios')(app);
require('./app/routes/nacionalidades')(app);
require('./app/routes/categorias')(app);
require('./app/routes/generos')(app);
require('./app/routes/provincias')(app);
require('./app/routes/autores')(app);
require('./app/routes/prestamos')(app);

app.listen(app.get('port'),()=>{
    console.log('Activo en puerto ',app.get('port'));
});