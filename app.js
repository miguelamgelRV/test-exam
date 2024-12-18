const express = require('express');
const app = express();
const port = 3080;

const userRoutes = require('./routes/index');

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});