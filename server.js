const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const bodyParser = require("body-parser");



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://achintahaldar183:haldar183@cluster0.nmmu2sp.mongodb.net/userDB');
  console.log("db connect");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });


const User = mongoose.model("User", userSchema);



const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.send("<h1>Wellcome to Backend</h1>");
})

app.post("/login", async(req,res)=>{

const user = new User();
user.email = req.body.email;
user.password = req.body.password;
const data = await user.save();

console.log(data);
res.json(data);
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
