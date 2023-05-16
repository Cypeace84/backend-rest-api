const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const seats = db.seats;

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/:id').get((req, res) => {
  const seat = seats.find((t) => t.id == req.params.id);

  if (!seat) {
    res.status(404).json({ message: 'Seat not found' });
  } else {
    res.json(seat);
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  console.log('seat:', req.body);
  console.log('Client:', req.body.client);
  if (!client || !seat || !day || !email) {
    res
      .status(400)
      .json({ message: 'client, seat, email and day are required' });
  } else {
    ////////////////////////////////////////////////////////////
    const isSeatTaken = seats.some((t) => t.day === day && t.seat === seat);
    if (isSeatTaken) {
      res.status(400).json({ message: 'The slot is already taken...' });
    } else {
      const newSeat = { id: uuidv4(), day, seat, client, email };
      res.set('Content-Type', 'application/json');
      seats.push(newSeat);
      res.json({ message: 'OK' });
    }
  }
});

router.route('/seats/:id').put((req, res) => {
  const seat = seats.find((t) => t.id == req.params.id);
  if (!seat) {
    res.status(404).json({ message: 'Seat not found' });
  } else {
    const { day, seatNumber, client, email } = req.body;
    console.log(day, seatNumber, client, email);
    if (!day & !seat & !client & !email) {
      res
        .status(404)
        .json({ message: 'day, seat, client or email are required' });
    } else {
      if (client) seat.client = client;
      if (seatNumber) seat.seatNumber = seat;
      if (day) seat.day = day;
      if (email) seat.email = email;
      res.json({ message: 'OK' });
    }
  }
});

router.route('/seats/:id').delete((req, res) => {
  const index = seats.findIndex((t) => t.id == req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Seat not found' });
  } else {
    seats.splice(index, 1);
    res.json({ message: 'OK' });
  }
});

module.exports = router;
