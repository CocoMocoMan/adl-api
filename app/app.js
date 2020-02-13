const express = require('express');
const app = express();
const port = 80;
const bodyParser = require('body-parser')
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: "root",
    password: "password",
    database: "adldb",
      port: 3306
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.use(bodyParser.json());

app.post('/users/create', (req, res) => {
  const user = req.body;
  console.log(user);
  const values = `null,
                  '${user.firstname}',
                  '${user.lastname}',
                  '${user.email}',
                  '',
                  '', 
                  '${user.accesstoken}',
                  true, 
                  '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', 
                  '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  const query = `INSERT INTO User VALUES (${values})`;
  con.query(query, (err, result) => {
    if(err) {
        console.log(err);
        res.send('Error');
    }
    res.send(result);
  });
});

app.get('/users/get', (req, res) => {
    const query = `SELECT * FROM User WHERE User.UserID = ${req.query.userID} AND User.Active = true`;
    con.query(query, (err, results) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else if (results.length == 0) res.send('User Not Found');
      else res.send(results[0]);
    });
  });
  
app.post('/users/update', (req, res) => {
    const user = req.body;
    console.log(user);
    const query = `UPDATE User SET
                    FirstName = '${user.firstname}',
                    LastName = '${user.lastname}',
                    Email = '${user.email}',
                    Biography = '${user.biography}',
                    Image = '${user.image}', 
                    ModifiedDate = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                    WHERE User.UserID = ${user.userID}`;
    con.query(query, (err, result) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else res.send(result);
    });
  });

app.get('/users/delete', (req, res) => {
    const query = `UPDATE User SET Active = false WHERE User.UserID = ${req.query.userID}`;
    con.query(query, (err, result) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else res.send(result);
    });
  });

  app.get('/users/login', (req, res) => {
    const query = `SELECT UserID FROM User WHERE User.AccessToken = '${req.query.accesstoken}' AND User.Active = true`;
    con.query(query, (err, results) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else if (results.length == 0) res.send('User Not Found');
      else res.send(results[0]);
    });
  });





