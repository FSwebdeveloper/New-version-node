const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { body, validationResult } = require('express-validator');



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://achintahaldar183:haldar183@cluster0.nmmu2sp.mongodb.net/userDB');
  console.log("db connect");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const userSchema = new mongoose.Schema({
    email:{
      type: String,
      unique: true
    },
    password:{
      type: String,
    }
  });


const User = mongoose.model("User", userSchema);
User.createIndexes();




const app = express();

app.use(cors());
app.use(bodyParser.json());


// app.get("/", (req, res) =>{
//     res.send("<h1>Wellcome to Backend</h1>");
// })

app.post("/login",[
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], (req,res)=>{

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

User.create({
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user))
    .catch(err=> console.log(err))
    res.json({error:"Please enter a unique email"});
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
