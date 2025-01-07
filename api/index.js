import express from "express";
import cors from "cors";
import connection from "../database/database.js";
const app = express();
const port = 6000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this first page from server");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/users", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email = req.body.email;
  const phone = req.body.phone;
  const anotherPhone = req.body.anotherPhone;
  const sql = `INSERT INTO users(username, password , role , email , phone ,  another_phone ) VALUES(?)`;
  const passwordHash = password.bcrypt();
  const values = [username, passwordHash, role, email, phone, anotherPhone];
  password.hash(10, (err, hash) => {
    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`app listenning port on port ${port}`);
});
