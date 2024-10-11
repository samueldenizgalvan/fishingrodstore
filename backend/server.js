const express = require("express");
const cors = require("cors");

const app = express();

let corsOption = {
  origin: "http://localhost:8100"
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ force: false });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gabriel application." });
});

require("./routes/user.routes")(app);
require("./routes/assisted-knife.routes")(app);
require("./routes/automatic-knife.routes")(app);
require("./routes/fixed-blade-knife.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});