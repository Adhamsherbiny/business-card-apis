import express from "express";
import cors from "cors";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/homepage", (req, res) => {
  res.json("Hello from homepage");
});

app.get("users", (req, res) => {
  const sql = "SELECT * FROM users";
});

app.listen(port, () => {
  console.log(`app listenning port on port ${port}`);
});
