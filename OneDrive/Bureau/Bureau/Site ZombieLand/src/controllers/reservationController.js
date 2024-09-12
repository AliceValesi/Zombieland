const { Reservation } = require('../models');

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).send(reservations);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      res.status(200).send(reservation);
    } else {
      res.status(404).send({ message: 'Réservation non trouvée' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      await reservation.update(req.body);
      res.status(200).send(reservation);
    } else {
      res.status(404).send({ message: 'Réservation non trouvée' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      await reservation.destroy();
      res.status(204).send({ message: 'Réservation supprimée' });
    } else {
      res.status(404).send({ message: 'Réservation non trouvée' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};