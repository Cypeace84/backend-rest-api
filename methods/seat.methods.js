const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createSeat = async (req, res) => {
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
        const newSeat = new Seat({ day, seat, client, email });
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
};

exports.updateSeat = async (req, res) => {
  try {
    const updatedSeat = await Seat.findById(req.params.id);
    if (!updatedSeat) {
      res.status(404).json({ message: 'Seat not found' });
    } else {
      const { day, seat, client, email } = req.body;
      console.log(day, seat, client, email);
      if (!day && !seat && !client && !email) {
        res
          .status(404)
          .json({ message: 'day, seat, client or email are required' });
      } else {
        if (client) updatedSeat.client = client;
        if (seat) updatedSeat.seat = seat;
        if (day) updatedSeat.day = day;
        if (email) updatedSeat.email = email;

        await s.save();

        res.json({ message: 'OK' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
    if (deletedSeat) {
      res.json(deletedSeat);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
