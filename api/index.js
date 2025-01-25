import express from "express";
import cors from "cors";
import connection from "../database/database.js";
import bcryptjs from "bcryptjs";
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

  connection.query(
    "SELECT * FROM users where username = ?",
    [username],
    async (err, result) => {
      if (result.length > 0) {
        res.json("user is already exist");
      } else {
        const hasedPassword = await bcryptjs.hash(password, 10);

        const values = [
          username,
          hasedPassword,
          role,
          email,
          phone,
          anotherPhone,
        ];

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
app.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users where username = ?",
    [username],
    async (err, result) => {
      if (result.length > 0) {
        const isMatch = await bcryptjs.compare(password, result[0].password);
        if (isMatch) {
          res.status(200).json({
            response: result,
            username: result[0].username,
            loginStatus: true,
            msg: "login successfully",
            token: `TkN:${Math.floor(Math.random() * 10000)}#b`,
          });
        } else {
          res.json({
            loginStatus: false,
            msg: "Username or Password is incorrect",
          });
        }
      } else {
        res.json({ loginStatus: false, msg: "login Faild" });
      }
    }
  );
});

app.put("/update_user", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email = req.body.email;
  const phone = req.body.phone;
  const anotherPhone = req.body.anotherPhone;

  connection.query(
    "SELECT * FROM users where username = ?",
    [username],
    async (err, result) => {
      if (result.length > 0) {
        const hasedPassword = await bcryptjs.hash(password, 10);

        const values = [
          username,
          hasedPassword,
          role,
          email,
          phone,
          anotherPhone,
        ];

        const sql =
          "UPDATE users SET username = ?, password = ?, role = ?, email = ?, phone = ?, another_phone = ? WHERE username = ?";
        connection.query(sql, [...values, username], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json("user updated");
          }
        });
      } else {
        res.json("user is not exist");
      }
    }
  );
});

app.delete("/delete_user", (req, res) => {
  const username = req.body.username;
  const sql = "DELETE FROM users WHERE username = ?";
  connection.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json("user deleted");
    }
  });
});

app.listen(port, () => {
  console.log(`app listenning port on port ${port}`);
});
