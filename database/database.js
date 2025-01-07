import mysql from "mysql";

const connection = mysql.createConnection({
  host: "bfcvg2iyjja5y2gv439u-mysql.services.clever-cloud.com",
  user: "up70anrhj3bguvib",
  password: "G8FrLpl0iAWzhdFlQPPJ",
  database: "bfcvg2iyjja5y2gv439u",
});

try {
  connection.connect();
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

export default connection;
