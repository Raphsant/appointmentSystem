const { Op } = require("sequelize");
const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");

async function createAppointment(doctorId, dateTime) {
  const doctor = await Doctor.findByPk(doctorId);
  if (!doctor) throw new Error("doctor not found");

  const existingAppointment = await Appointment.findOne({
    where: {
      doctorId,
      dateTime: {
        [Op.eq]: dateTime,
      },
    },
  });
  if (existingAppointment) throw new Error("Doctor is not available.");

  const newAppointment = await Appointment.create({
    doctorId,
    dateTime,
  });

  return newAppointment;
}

async function getAppointment(appointmentId) {
  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) {
    throw new Error("Appointment not found");
  }
  return appointment;
}

async function updateAppointment(appointmentId, doctorId, dateTime) {
  const appointment = await getAppointment(appointmentId);

  // Check if doctor exists
  const doctor = await Doctor.findByPk(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Check if doctor is available
  const existingAppointment = await Appointment.findOne({
    where: {
      id: { [Op.ne]: appointmentId },
      doctorId,
      dateTime: { [Op.eq]: dateTime },
    },
  });

  if (existingAppointment) {
    throw new Error("Doctor is not available at this time");
  }

  await appointment.update({ doctorId, dateTime });
  return appointment;
}

async function deleteAppointment(appointmentId) {
  const appointment = await getAppointment(appointmentId);
  await appointment.destroy();
}

module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
