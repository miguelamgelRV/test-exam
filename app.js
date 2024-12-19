const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
const database = require('./config/db');
const User = require('./models/userModel');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.use('/costumers-api', userRoutes);

database.connect();
database.sync().then(async () => {
  
  const count = await User.model.count();
  if (count === 0) {
    await User.createUser("admin", "admin@example.com", "adminpassword");
    console.log("Usuario por defecto creado");
  }
});

const port = 3080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
