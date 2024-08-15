const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

const db = new sqlite3.Database('./appointments.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            service TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL
        )
    `);
});
app.post('/appointments', (req, res) => {
    const { name, phone, service, date, time } = req.body;
    db.run(
        `INSERT INTO appointments (name, phone, service, date, time) VALUES (?, ?, ?, ?, ?)`,
        [name, phone, service, date, time],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});


app.listen(port ,() => {
    console.log('Servidor não encontrado')
})