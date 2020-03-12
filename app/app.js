const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const normalizeDateTime = require('./utils/normalize-datetime');

const app = express();
const port = 80;

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
                  '${normalizeDateTime(new Date())}', 
                  '${normalizeDateTime(new Date())}'`;
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
                    ModifiedDate = '${normalizeDateTime(new Date())}'
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

app.post('/community/create', (req, res) => {
    const commmunity = req.body;
    console.log(commmunity);
    const values = `null,
                    '${commmunity.name}',
                    '${commmunity.description}',
                    '${commmunity.ownerID}',
                    '', 
                    true, 
                    '${normalizeDateTime(new Date())}', 
                    '${normalizeDateTime(new Date())}'`;
    const query = `INSERT INTO Community VALUES (${values})`;
    con.query(query, (err, result) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      res.send(result);
    });
  });

  app.get('/community/getforuser', (req, res) => {
    const query = `SELECT Community.* FROM Community WHERE Community.OwnerID = '${req.query.userID}' AND Community.Active = true`;
    con.query(query, (err, results) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else if (results.length == 0) res.send('No Communities Found');
      else res.send(results);
    });
  });

  app.get('/community/delete', (req, res) => {
    const query = `UPDATE Community SET Active = false WHERE Community.CommunityID = ${req.query.communityID}`;
    con.query(query, (err, result) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else res.send(result);
    });
  });

  app.post('/post/create', (req, res) => {
    const post = req.body;
    console.log(post);
    const values = `null,
                    '${post.title}',
                    '${post.type}',
                    '${post.textBody}',
                    '', 
                    '${post.posterID}',
                    '${post.communityID}',
                    true, 
                    '${normalizeDateTime(new Date())}', 
                    '${normalizeDateTime(new Date())}'`;
    const query = `INSERT INTO Post VALUES (${values})`;
    con.query(query, (err, result) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      res.send(result);
    });
  });

  app.get('/post/getforcommunity', (req, res) => {
    const query = `SELECT Post.* FROM Post WHERE Post.CommunityID = '${req.query.communityID}' AND Post.Active = true`;
    con.query(query, (err, results) => {
      if(err) {
          console.log(err);
          res.send('Error');
      }
      else if (results.length == 0) res.send('No Posts Found');
      else res.send(results);
    });
  });








