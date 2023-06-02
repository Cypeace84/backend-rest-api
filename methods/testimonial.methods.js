const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testim = await Testimonial.findOne().skip(rand);
    if (!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testim = await Testimonial.findById(req.params.id);
    if (!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const testim = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { author: author, text: text },
      { new: true }
    );
    if (testim) {
      res.json(testim);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testim = await Testimonial.findByIdAndDelete(req.params.id);
    if (testim) {
      res.json(testim);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
