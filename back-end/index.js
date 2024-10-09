require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: process.env.BODY_PARSER_LIMIT }))

const credentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

app.get('/', (req, res) => {
    res.send('Hola desde tu primera ruta de la API')
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  const values = [username]
  var connection = mysql.createConnection(credentials)
  connection.query("SELECT * FROM usuarios WHERE username = ?", values, (err, result) => {
      if (err) {
          res.status(500).send(err)
      } else {
          if (result.length > 0) {
              if (result[0].password === password) {
                  res.status(200).send({
                      "id": result[0].id,
                      "user": result[0].full_name,
                      "username": result[0].username,
                      "message": "Login exitoso"
                  })
              } else {
                  res.status(401).send('Contraseña incorrecta')
              }
          } else {
              res.status(404).send('Usuario no registrado')
          }
      }
  })
  connection.end()
})

app.post('/api/register', (req, res) => {
    const { 
        fullName, username, email, phoneNumber, password, 
        gender, cedula, fechaNacimiento, enfermedades, 
        medicamentos, tratamiento 
    } = req.body;

    const query = `INSERT INTO usuarios 
        (username, password, email, full_name, phone_number, gender, cedula, 
        fecha_nacimiento, enfermedades, medicamentos, tratamiento) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        username, password, email, fullName, phoneNumber, gender, cedula,
        fechaNacimiento, enfermedades, medicamentos, tratamiento
    ];

    const connection = mysql.createConnection(credentials);
    
    connection.query(query, values, (err, result) => {
        if (err) {
            res.status(500).send('Error en el registro: ' + err.message);
        } else {
            res.status(200).send('Usuario registrado exitosamente');
        }
    });

    connection.end();
});

app.get('/api/enfermeros/:userId', (req, res) => {
  const userId = req.params.userId;
  const connection = mysql.createConnection(credentials);
  const query = 'SELECT * FROM enfermeros WHERE usuario_id = ?';
  
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos del enfermero:', err);
      res.status(500).send('Error al obtener los datos del enfermero: ' + err.message);
    } else {
      if (result.length > 0) {
        const enfermero = {
          id: result[0].id,
          nombreCompleto: result[0].nombre_completo,
          cedula: result[0].cedula,
          fechaNacimiento: result[0].fecha_nacimiento,
          genero: result[0].genero,
          telefono: result[0].telefono,
          usuario_id: result[0].usuario_id
        };
        res.status(200).json(enfermero);
      } else {
        res.status(404).send('No se encontraron datos para este usuario');
      }
    }
  });

  connection.end();
});

app.post('/api/enfermeros', (req, res) => {
  const { nombreCompleto, cedula, fechaNacimiento, genero, telefono, usuario_id } = req.body;
  
  if (!usuario_id) {
    return res.status(400).send('Se requiere ID de usuario (usuario_id)');
  }

  const connection = mysql.createConnection(credentials);
  const query = `INSERT INTO enfermeros 
    (nombre_completo, cedula, fecha_nacimiento, genero, telefono, usuario_id) 
    VALUES (?, ?, ?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE 
    nombre_completo = VALUES(nombre_completo), 
    fecha_nacimiento = VALUES(fecha_nacimiento), 
    genero = VALUES(genero), 
    telefono = VALUES(telefono)`;
  
  const values = [nombreCompleto, cedula, fechaNacimiento, genero, telefono, usuario_id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al guardar los datos del enfermero:', err);
      res.status(500).send('Error al guardar los datos del enfermero: ' + err.message);
    } else {
      res.status(200).send('Datos del enfermero guardados exitosamente');
    }
  });

  connection.end();
});

app.put('/api/enfermeros/:userId', (req, res) => {
  const userId = req.params.userId;
  const { nombreCompleto, cedula, fechaNacimiento, genero, telefono } = req.body;
  const connection = mysql.createConnection(credentials);
  const query = 'UPDATE enfermeros SET nombre_completo = ?, cedula = ?, fecha_nacimiento = ?, genero = ?, telefono = ? WHERE usuario_id = ?';
  const values = [nombreCompleto, cedula, fechaNacimiento, genero, telefono, userId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de enfermero:', err);
      res.status(500).send('Error al actualizar el registro de enfermero: ' + err.message);
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send('Registro de enfermero actualizado exitosamente');
      } else {
        res.status(404).send('No se encontró el registro de enfermero para actualizar');
      }
    }
  });

  connection.end();
});

app.get('/api/paciente/:userId', (req, res) => {
  const userId = req.params.userId;
  const connection = mysql.createConnection(credentials);
  const query = 'SELECT full_name, fecha_nacimiento, cedula, phone_number, enfermedades, medicamentos, tratamiento FROM usuarios WHERE id = ?';
  
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos del paciente:', err);
      res.status(500).send('Error al obtener los datos del paciente: ' + err.message);
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send('No se encontraron datos para este usuario');
      }
    }
  });

  connection.end();
});

  app.get('/api/estados-humor', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send('Se requiere ID de usuario');
    }
  
    const connection = mysql.createConnection(credentials);
    const query = 'SELECT * FROM estados_humor WHERE usuario_id = ? ORDER BY fecha_registro DESC';
    
    connection.query(query, [userId], (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener los estados de humor: ' + err.message);
      } else {
        res.status(200).json(result);
      }
    });
  
    connection.end();
  });
  
  app.post('/api/estados-humor', (req, res) => {
    const { usuario_id, estado, observacion } = req.body;
  
    if (!usuario_id || !estado) {
      return res.status(400).send('Se requieren ID de usuario y estado');
    }
  
    const connection = mysql.createConnection(credentials);
    const query = 'INSERT INTO estados_humor (usuario_id, estado, observacion) VALUES (?, ?, ?)';
    const values = [usuario_id, estado, observacion];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        res.status(500).send('Error al registrar el estado de humor: ' + err.message);
      } else {
        res.status(200).send('Estado de humor registrado exitosamente');
      }
    });
  
    connection.end();
  });

  app.get('/api/observaciones', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send('Se requiere ID de usuario');
    }
  
    const connection = mysql.createConnection(credentials);
    const query = 'SELECT * FROM observaciones WHERE usuario_id = ? ORDER BY fecha DESC, hora DESC';
    
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error al obtener las observaciones:', err);
        res.status(500).send('Error al obtener las observaciones: ' + err.message);
      } else {
        // Formatear las fechas antes de enviarlas al cliente
        const formattedResult = result.map(obs => ({
          ...obs,
          fecha: new Date(obs.fecha).toISOString().split('T')[0], // Formato YYYY-MM-DD
          hora: obs.hora.slice(0, 5) // Formato HH:MM
        }));
        res.status(200).json(formattedResult);
      }
    });
  
    connection.end();
  });
  
  app.post('/api/observaciones', (req, res) => {
    const { usuario_id, texto } = req.body;
  
    if (!usuario_id || !texto) {
      return res.status(400).send('Se requieren ID de usuario y texto de la observación');
    }
  
    const now = new Date();
    const fecha = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(' ')[0].slice(0, 5); // HH:MM
  
    const connection = mysql.createConnection(credentials);
    const query = 'INSERT INTO observaciones (usuario_id, texto, fecha, hora) VALUES (?, ?, ?, ?)';
    const values = [usuario_id, texto, fecha, hora];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        res.status(500).send('Error al registrar la observación: ' + err.message);
      } else {
        res.status(200).json({ 
          id: result.insertId,
          usuario_id,
          texto,
          fecha,
          hora
        });
      }
    });
  
    connection.end();
  });
  // Obtener alarmas del usuario
app.get('/api/alarmas', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send('Se requiere ID de usuario');
  }

  const connection = mysql.createConnection(credentials);
  const query = 'SELECT * FROM alarmas_medicamentos WHERE usuario_id = ? ORDER BY fecha_programada ASC';
  
  connection.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener las alarmas: ' + err.message);
    } else {
      res.status(200).json(result);
    }
  });

  connection.end();
});

// Agregar nueva alarma
app.post('/api/alarmas', (req, res) => {
  const { usuario_id, dia, hora, minutos, medicamento } = req.body;

  if (!usuario_id || !dia || !hora || !minutos || !medicamento) {
    return res.status(400).send('Se requieren todos los campos de la alarma');
  }

  const connection = mysql.createConnection(credentials);
  const query = 'INSERT INTO alarmas_medicamentos (usuario_id, dia, hora, minutos, medicamento, fecha_programada) VALUES (?, ?, ?, ?, ?, ?)';
  const fechaProgramada = `${dia} ${hora}:${minutos}:00`;
  const values = [usuario_id, dia, hora, minutos, medicamento, fechaProgramada];

  connection.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send('Error al registrar la alarma: ' + err.message);
    } else {
      res.status(200).json({
        message: 'Alarma registrada exitosamente',
        id: result.insertId,
        dia,
        hora,
        minutos,
        medicamento,
        fecha_programada: fechaProgramada
      });
    }
  });

  connection.end();
});
app.put('/api/alarmas/:id', (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const connection = mysql.createConnection(credentials);
  const query = 'UPDATE alarmas_medicamentos SET estado = ? WHERE id = ?';
  
  connection.query(query, [estado, id], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el estado de la alarma: ' + err.message);
    } else {
      res.status(200).json({ message: 'Estado de alarma actualizado exitosamente' });
    }
  });

  connection.end();
});

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))