const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// const db = require('./db');
// const seats = db.seats;
const Seat = require('./models/seat.model');

// router.route('/seats').get((req, res) => {
//   res.json(seats);
// });
router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

///////////////////////*****//////////////////////////////

// router.route('/seats/:id').get((req, res) => {
//   const seat = seats.find((t) => t.id == req.params.id);

//   if (!seat) {
//     res.status(404).json({ message: 'Seat not found' });
//   } else {
//     res.json(seat);
//   }
// });

router.get('/seats/:id', async (req, res) => {
  try {
    const s = await Seat.findById(req.params.id);
    if (!s) res.status(404).json({ message: 'Not found' });
    else res.json(s);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

///////////////////////*****//////////////////////////////

// router.route('/seats').post((req, res) => {
//   const { day, seat, client, email } = req.body;
//   console.log('seat:', req.body);
//   console.log('Client:', req.body.client);
//   if (!client || !seat || !day || !email) {
//     res
//       .status(400)
//       .json({ message: 'client, seat, email and day are required' });
//   } else {
//     ////////////////////////////////////////////////////////////
//     const isSeatTaken = seats.some((t) => t.day === day && t.seat === seat);
//     if (isSeatTaken) {
//       res.status(400).json({ message: 'The slot is already taken...' });
//     } else {
//       const newSeat = { id: uuidv4(), day, seat, client, email };
//       res.set('Content-Type', 'application/json');
//       seats.push(newSeat);
//       // Emit seatsUpdated event to all clients
//       const io = req.io;
//       io.emit('seatsUpdated', seats);

//       res.json({ message: 'OK' });
//     }
//   }
// });

router.post('/seats', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    console.log('seat:', req.body);
    console.log('Client:', req.body.client);
    if (!client || !seat || !day || !email) {
      res
        .status(400)
        .json({ message: 'client, seat, email and day are required' });
    } else {
      const isSeatTaken = await Seat.exists({ day: day, seat: seat });
      if (isSeatTaken) {
        res.status(400).json({ message: 'The slot is already taken...' });
      } else {
        const newSeat = new Seat({ id: uuidv4(), day, seat, client, email });
        await newSeat.save();
        // Emit seatsUpdated event to all clients
        const updatedSeats = await Seat.find();
        const io = req.io;
        io.emit('seatsUpdated', updatedSeats);

        res.json({ message: 'OK' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

///////////////////////*****//////////////////////////////

// router.route('/seats/:id').put((req, res) => {
//   const seat = seats.find((t) => t.id == req.params.id);
//   if (!seat) {
//     res.status(404).json({ message: 'Seat not found' });
//   } else {
//     const { day, seatNumber, client, email } = req.body;
//     console.log(day, seatNumber, client, email);
//     if (!day & !seat & !client & !email) {
//       res
//         .status(404)
//         .json({ message: 'day, seat, client or email are required' });
//     } else {
//       if (client) seat.client = client;
//       if (seatNumber) seat.seatNumber = seat;
//       if (day) seat.day = day;
//       if (email) seat.email = email;
//       res.json({ message: 'OK' });
//     }
//   }
// });

router.put('/seats/:id', async (req, res) => {
  try {
    const s = await Seat.findById(req.params.id);
    if (!s) {
      res.status(404).json({ message: 'Seat not found' });
    } else {
      const { day, seat, client, email } = req.body;
      console.log(day, seat, client, email);
      if (!day && !seat && !client && !email) {
        res
          .status(404)
          .json({ message: 'day, seat, client or email are required' });
      } else {
        if (client) s.client = client;
        if (seat) s.seat = seat;
        if (day) s.day = day;
        if (email) s.email = email;

        await s.save();

        res.json({ message: 'OK' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

///////////////////////*****//////////////////////////////

// router.route('/seats/:id').delete((req, res) => {
//   const index = seats.findIndex((t) => t.id == req.params.id);
//   if (index === -1) {
//     res.status(404).json({ message: 'Seat not found' });
//   } else {
//     seats.splice(index, 1);
//     res.json({ message: 'OK' });
//   }
// });

router.delete('/seats/:id', async (req, res) => {
  try {
    const s = await Seat.findByIdAndDelete(req.params.id);
    if (s) {
      res.json(s);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
