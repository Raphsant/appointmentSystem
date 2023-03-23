const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const Role = db.role;
const Doctor = db.doctor;

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/auth.routes")(app);

require("./routes/user.routes")(app);

require("./routes/doctor.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
  Doctor.create({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    specialty: "test1",
  });
  Doctor.create({
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    specialty: "test1",
  });
}
