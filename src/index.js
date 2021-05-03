const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')


const app = express();

// Base de datos
dbConnection();

// Directorio Publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// CORS
app.use(cors())

// Rutas
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/user', require('./routes/auth'));
app.use('/api/suppliers', require('./routes/supplier'));
app.use('/api/merchandises', require('./routes/merchandise'));
app.use('/api/sales', require('./routes/sale'));
app.use('/api/sale-details', require('./routes/sale-detail'));

/*
    PorHacer: 
        - Agregar validaciones a todas las rutas y recibir los errores en los controladores (completado categorias,  productos y auth)
        - Agregar middleware para comprobar si el token y el rol! (Terminado)
        - Terminar siguientes controladores y conexiones
*/





app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})



