const mysql = require('promise-mysql');
const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');

const fetchOrigin = '*';

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', router);


app.get('/', async function(req, res) {
  res.send('Hello World!')
});

app.get('/test', async (req, res) => {
    makeQuery('select * from test_login')
    .then(data => res.json(data))
    .catch(err => handleErr(err, res, null));
    
});

app.get('/login', async (req, res) => {
    console.log("attempting to login");
//    console.log(req);
    var phonenumReq = req.query.phone_num;
    var passwordReq = req.query.password;

    makeQuery("SELECT username FROM test_login WHERE phone_num = ? AND password = ? limit 1", [phonenumReq, passwordReq])
    .then(data => {
        res.set('Access-Control-Allow-Origin', fetchOrigin);
        if (data.length == 1) {
            res.send(data[0].username);
        } else {
//            throw new Error("Incorrect account information");
            res.status(400).send("Invalid username or password");
        }
    }).catch(err => handleErr(err, res, null));
});

app.post('/register', async (req, res) => {
    var today = new Date();
    console.log("attemping to signup");
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    var users = {
        "customer_name" : req.body.name,
        "customer_surname" : req.body.surname,
        "customer_password" : passwordHash,
        //"customer_birthdate" :today.toISOString().slice(0, 19).replace('T', ' '),
        "customer_phone_num" : req.body.phone_num,
        "customer_primary_address" : req.body.primary_address
    };

    var phone_numReq = req.body.phone_num;
    makeQuery("SELECT customer_phone_num FROM customers WHERE customer_phone_num = ?", phone_numReq)
    .then(result => {
        if (!result || !result[0]) {
            makeQuery('INSERT INTO customers SET ?', users)
            .then(results => {
                res.json({
                    status: true,
                    data: results,
                    message: 'user registered sucessfully'
                });
            }).catch(err => handleErr(err, res, 'there are some error with query'));
        }
        else {
            res.send("phone number already in used");
            console.log(result);
        }
    }).catch(err => handleErr(err, res, null));
});


//app.get('/username', function(req, res,next){
//  con.query("SELECT username FROM member",function (err, result, fields){
//    if (err) throw err;
//    console.log(result);
//    res.type("json");
//    res.send(result);
//  });
//});

async function makeQuery(qry, args) {
  let db;
  try {
    db = await getDB();
    let data;
    if (args != null) {
      data = await db.query(qry, args);
    } else {
      data = await db.query(qry);
    }
    db.end();
    return data;
  } catch (err) {
    if (db) { // undefined if an error occurred in getDB()
      db.end();
    }
    console.log(err);
    throw err; // to bubble up an error to be caught in the function that called makeQuery().
  }
}

async function getDB() {
  let database = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
//    password: "your_password",
    database: "test_db"
  });
  return database;
}

//function checkStatus(response) {
//  if (response.ok) {
//    return response;
//  } else {
//     throw Error("Error in request: " + response.statusText);
//  }
//}

/**
 * Handle error when unable to read source file or invalid get parameters.
 * @param {error} err - error information.
 * @param {response} res - response object to send data.
 * @param {string} msg - err message.
 */
function handleErr(err, res, msg) {
  console.log(err);
  if (err.code === "ENOENT") {
    res.type('text');
    res.status(400).send(msg);
  } else {
    res.type('text');
    res.status(500).send('Something went wrong on the server, try again later.');
  }
}

app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening on port 3000");
});