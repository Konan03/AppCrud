const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Importar conexión a la base de datos
const db = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir rutas CRUD aquí
// Por ejemplo, una ruta para obtener registros podría ser:
app.get('/items', (req, res) => {
  // Aquí irá el código para obtener registros de la base de datos
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    const query = 'INSERT INTO usuarios SET ?';
    db.query(query, nuevoUsuario, (error, results) => {
      if (error) throw error;
      res.status(201).send(`Usuario añadido con el ID: ${results.insertId}`);
    });
});

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
});
  
// Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results[0]);
    });
});
  

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuarioModificado = req.body;
    const query = 'UPDATE usuarios SET ? WHERE id = ?';
    db.query(query, [usuarioModificado, id], (error, results) => {
      if (error) throw error;
      res.status(200).send(`Usuario con el ID: ${id} actualizado.`);
    });
});


app.delete('/usuarios/:id', (req, res) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
      if (error) throw error;
      res.status(200).send(`Usuario con el ID: ${req.params.id} eliminado.`);
    });
});
  
  
  