require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.REACT_APP_PORT;

mongoose.connect(process.env.REACT_APP_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error(err);
});

connection.once("open", () => {
  console.log("Connection to MongoDB is successful");
});

app.use(express.json());
app.use(cors());

const user = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Users = mongoose.model("Users", user);

app.post("/login", async (req, res) => {
  console.log("Login")
  try {
    const { email, password } = req.body;
    console.log(email,password)

    const data = await Users.find({email:email});
    console.log("Database: ",data)

    if(data[0].password === password && data.length === 1){
        res.json({message:true, name:data[0].name, email})
    }else{
        res.json({error:false})
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve data from the database" });
  }
});

app.post("/signup", async (req, res) => {
  console.log("SignUp")
    try {
      const { name, email, password } = req.body;

      const data = await Users.find({ email });
  
      if (data.length === 0) {
        const newUser = new Users({ name, email, password });
        const result = await newUser.save();
        res.json(result);
      } else {
        res.json({ message: "Email already registered" });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Failed to insert data into the database" });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
