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

app.listen(port, () => {
  console.log(`app listenning port on port ${port}`);
});
