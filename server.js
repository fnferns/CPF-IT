const mysql = require('mysql');
const express = require('express')
const app = express()
const morgan = require("morgan");
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/',router);


app.get('/', function (req, res) {
  res.send('Hello World!')
})

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'FiveTest'
  
});




app.post('/register', function(req,res){
    var today = new Date();
    console.log("attemping to signup");
    const passwordHash = bcrypt.hashSync(req.body.password,10);
    var users={
        "customer_name":req.body.name,
        "customer_surname" :req.body.surname,
        "customer_password":passwordHash,
        //"customer_birthdate" :today.toISOString().slice(0, 19).replace('T', ' '),
        "customer_phone_num" :req.body.phone_num,
        "customer_primary_address" :req.body.primary_address
    };

    var phone_numReq = req.body.phone_num;
    con.query("SELECT customer_phone_num FROM customers WHERE customer_phone_num='"+phone_numReq+"'" , function (err, result, fields) {
        if (!result || !result[0]){
            con.query('INSERT INTO customers SET ?',users, function (error, results, fields) {
                if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query',
                    log:error
                });
                }else{
                    res.json({
                    status:true,
                    data:results,
                    message:'user registered sucessfully'
                        })
                    };
                });
        }
        else{
        
            res.send("phone number already in used");
            console.log(result);
        }});
    
});




app.post('/login', function(req, res,next){
  console.log("attempting to login");
  var phone_numReq = req.body.phone_num + "";
  var passwordReq = req.body.password + "";
  

    con.query("SELECT customer_phone_num,customer_password FROM customers WHERE customer_phone_num='"+ phone_numReq+"'" , function (err, result, fields) {
      if (err) throw err;
      let passwordHash = result[0].customer_password;
      console.log(result)
      if (!result || !result[0]){
        res.send('username does not exist');
      }
      
      else if (phone_numReq==result[0].customer_phone_num&&bcrypt.compareSync(req.body.password,passwordHash)){
        res.send("login sucessful!");
      }
      else {
        res.send("wrong password u dumbass");
      }
      
      // console.log(result);
    });
});


app.get('/username', function(req, res,next){
  con.query("SELECT username FROM member",function (err, result, fields){
    if (err) throw err;
    console.log(result);
    res.type("json");
    res.send(result);
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
