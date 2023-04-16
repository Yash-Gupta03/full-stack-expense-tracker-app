const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const cors = require("cors");
const app = express();

app.use(bodyParser.json({ exteded: false }));

app.use(cors());

const expenseRoutes = require("./routers/items");

app.use(expenseRoutes);

sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));

app.listen(3000);
