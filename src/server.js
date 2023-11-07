const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());
// add s path where you want to deploy the database, added local path here
const db = new sqlite3.Database('/Users/omarhaweel/Desktop/hello-react/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the users database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Table creation error:', err.message);
      } else {
        console.log('Table "users" ensured to exist or created successfully.');
      }
    });
});

// Endpoint for user registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  
    db.run(query, [name, email, password], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Helper function to check user existence
function checkUser(email, password, callback) {
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, row) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, row);
    });
}


  

// Endpoint for user login

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    checkUser(email, password, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (user) {
        res.status(200).json({ success: true, message: user.name });
      } else {
        res.status(404).json({ success: false, message: 'User not registered' });
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
