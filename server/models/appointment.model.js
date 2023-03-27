const User = require("./user.model");
module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateTime: {
      type: Sequelize.DATE,
    },
  });

  return Appointment;
};
