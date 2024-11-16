require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();

// Para la Foto //1
let path = require ('path');
app.use(express.static(path.join(__dirname, 'public')));

let corsOption = {
  //origin: "http://localhost:8100"
  origin: "*"
};

// Middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincronizar con la base de datos
const db = require("./models");
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully.");
    db.createAdminRole(); // Llamo a createAdminRole desde el objeto db 
  })
  .catch((err) => {
    console.log("Error syncing database:", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gabriel application." });
});

// Rutas
require("./routes/user.routes")(app);
require("./routes/products.routes")(app);
require("./routes/shopping-cart.routes")(app);

// Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});