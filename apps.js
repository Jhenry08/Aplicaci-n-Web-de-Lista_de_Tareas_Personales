
const express = require('express');
const tareaRoutes = require('./routes/tareaRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));  // Servir archivos estáticos


app.use('/api', tareaRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
