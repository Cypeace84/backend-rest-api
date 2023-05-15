const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const concerts = db.concerts;

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const concert = concerts.find((t) => t.id == req.params.id);

  if (!concert) {
    res.status(404).json({ message: 'Concert not found' });
  } else {
    res.json(concert);
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  console.log('concert:', req.body);
  console.log('Performer:', req.body.performer);
  if (!performer || !genre || !price || !day) {
    res
      .status(400)
      .json({ message: 'Performer, genre, price and day are required' });
  } else {
    const newConcert = { id: uuidv4(), performer, genre, price, day, image };
    res.set('Content-Type', 'application/json');
    concerts.push(newConcert);
    res.json({ message: 'OK' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const concert = concerts.find((t) => t.id == req.params.id);
  if (!concert) {
    res.status(404).json({ message: 'Concert not found' });
  } else {
    const { performer, genre, price, day, image } = req.body;
    console.log(performer, genre, price, day, image);
    if (!performer & !genre & !price & !day & !image) {
      res
        .status(400)
        .json({ message: 'Performer, genre, price or day are required' });
    } else {
      if (performer) concert.performer = performer;
      if (genre) concert.genre = genre;
      if (price) concert.price = price;
      if (day) concert.day = day;
      if (image) concert.image = image;
      res.json({ message: 'OK' });
    }
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const index = concerts.findIndex((t) => t.id == req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Concert not found' });
  } else {
    concerts.splice(index, 1);
    res.json({ message: 'OK' });
  }
});

module.exports = router;
