const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

// Create the connection pool (utk megkonesksi dri database ke backend)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rekammedis',
});

//middleware lainnya
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors("*"));
// pengeimplementasi CRUD
app.get('/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    connection.query('SELECT * FROM pasien', (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Query error' });
        return;
      }

      res.json(results);
    });
  });
});

app.post('/users', (req, res) => {
  console.log(req.body)
  const { NO_RM, nama, tempat_lahir, tgl_lahir, alamat, gol_darah } = req.body; // Ambil data dari body request
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const query = `INSERT INTO pasien(NO_RM, nama, tempat_lahir, tgl_lahir, alamat, gol_darah) VALUES ('${NO_RM}', '${nama}', '${tempat_lahir}', '${tgl_lahir}', '${alamat}', '${gol_darah}');`
    connection.query(query, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Query error' });
        return;
      }

      res.json({ message: 'Data berhasil ditambahkan' });
    });
  });
});

app.put('/users/:NO_RM', (req, res) => {
  const NO_RM = req.params.NO_RM;
  const { nama, tempat_lahir, tgl_lahir, alamat, gol_darah } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const query = `UPDATE pasien SET nama = '${nama}', tempat_lahir = '${tempat_lahir}', tgl_lahir = '${tgl_lahir}', alamat = '${alamat}', gol_darah = '${gol_darah}' WHERE NO_RM = '${NO_RM}';`;

    connection.query(query, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Query error' });
        return;
      }

      res.json({ message: 'Data berhasil diupdate' });
    });
  });
});


app.delete('/users/:NO_RM', (req, res) => {
  const NO_RM = req.params.NO_RM;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const query = `DELETE FROM pasien WHERE NO_RM = '${NO_RM}';`;

    connection.query(query, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Query error' });
        return;
      }

      res.json({ message: 'Data berhasil dihapus' });
    });
  });
});


app.listen(6001, () => {
  console.log('Server berjalan di port 6001');
});
