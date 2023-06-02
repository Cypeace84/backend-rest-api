const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const c = await Concert.findById(req.params.id);
    if (!c) res.status(404).json({ message: 'Not found' });
    else res.json(c);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    console.log(performer, genre, price, day, image);
    if (!performer || !genre || !price || !day) {
      res
        .status(400)
        .json({ message: 'Performer, genre, price and day are required' });
    } else {
      const newConcert = new Concert({
        // id: uuidv4(),
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
      });
      await newConcert.save();
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: 'err' });
  }
};

exports.updateConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const updatedFields = {};

    if (performer) updatedFields.performer = performer;
    if (genre) updatedFields.genre = genre;
    if (price) updatedFields.price = price;
    if (day) updatedFields.day = day;
    if (image) updatedFields.image = image;

    const updatedConcert = await Concert.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedConcert) {
      res.status(404).json({ message: 'Concert not found' });
    } else {
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.delete = async (req, res) => {
  try {
    const c = await Concert.findByIdAndDelete(req.params.id);
    if (c) {
      res.json(c);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
