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

app.post("/create_new_user", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email = req.body.email;
  const phone = req.body.phone;
  const anotherPhone = req.body.anotherPhone;
  const values = [username, password, role, email, phone, anotherPhone];

  connection.query(
    "SELECT * FROM users where username = ?",
    [username],
    (err, result) => {
      if (result.length > 2) {
        res.json("user is already exist");
      } else {
        const sql =
          "INSERT INTO users (username, password, role, email, phone, another_phone) VALUES (?)";
        connection.query(sql, [values], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json("user created");
          }
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`app listenning port on port ${port}`);
});
