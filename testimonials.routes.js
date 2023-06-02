const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// const db = require('./db');
// const testimonials = db.testimonials;

// const Testimonial = require('./models/testimonial.model');
const TestimonialMethod = require('./methods/testimonial.methods');

router.get('/testimonials', TestimonialMethod.getAll);
router.get('/testimonials/random', TestimonialMethod.getRandom);
router.get('/testimonials/:id', TestimonialMethod.getById);
router.post('/testimonials', TestimonialMethod.createTestimonial);
router.put('/testimonials/:id', TestimonialMethod.updateTestimonial);
router.delete('/testimonials/:id', TestimonialMethod.delete);

module.exports = router;

/* zakomentowane były w server.js */

// app.get('/testimonials', (req, res) => {
//   res.json(testimonials);
// });
// router.route('/testimonials').get((req, res) => {
//   res.json(testimonials);
// });
// router.get('/testimonials', async (req, res) => {
//   try {
//     res.json(await Testimonial.find());
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

//////////////////////******////////////////////////////////////

// app.get('/testimonials/random', (req, res) => {
//   const randomTestimonial =
//     testimonials[Math.floor(Math.random() * testimonials.length)];
//   res.json(randomTestimonial);
//   console.log('random', randomTestimonial);
// });
// router.route('/testimonials/random').get((req, res) => {
//   const randomTestimonial =
//     testimonials[Math.floor(Math.random() * testimonials.length)];
//   res.json(randomTestimonial);
//   console.log('random', randomTestimonial);
// });

// router.get('/testimonials/random', async (req, res) => {
//   try {
//     const count = await Testimonial.countDocuments();
//     const rand = Math.floor(Math.random() * count);
//     const testim = await Testimonial.findOne().skip(rand);
//     if (!testim) res.status(404).json({ message: 'Not found' });
//     else res.json(testim);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

//////////////////////******////////////////////////////////////

// app.get('/testimonials/:id', (req, res) => {
//   const testimonial = testimonials.find((t) => t.id == req.params.id);

//   if (!testimonial) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     res.json(testimonial);
//   }
// });

// router.route('/testimonials/:id').get((req, res) => {
//   const testimonial = testimonials.find((t) => t.id == req.params.id);

//   if (!testimonial) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     res.json(testimonial);
//   }
// });

// router.get('/testimonials/:id', async (req, res) => {
//   try {
//     const testim = await Testimonial.findById(req.params.id);
//     if (!testim) res.status(404).json({ message: 'Not found' });
//     else res.json(testim);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

//////////////////////******////////////////////////////////////

// app.post('/testimonials', (req, res) => {
//   const { author, text } = req.body;
//   console.log('Author:', req.body);
//   console.log('Author:', req.body.author);
//   if (!author || !text) {
//     res.status(400).json({ message: 'Author and text are required' });
//   } else {
//     const newTestimonial = { id: uuidv4(), author, text };
//     res.set('Content-Type', 'application/json');
//     testimonials.push(newTestimonial);
//     res.json({ message: 'OK' });
//   }
// });

// router.route('/testimonials').post((req, res) => {
//   const { author, text } = req.body;
//   console.log('Author:', req.body);
//   console.log('Author:', req.body.author);
//   if (!author || !text) {
//     res.status(400).json({ message: 'Author and text are required' });
//   } else {
//     const newTestimonial = { id: uuidv4(), author, text };
//     res.set('Content-Type', 'application/json');
//     testimonials.push(newTestimonial);
//     res.json({ message: 'OK' });
//   }
// });

// router.post('/testimonials', async (req, res) => {
//   try {
//     const { author, text } = req.body;
//     const newTestimonial = new Testimonial({ author: author, text: text });
//     await newTestimonial.save();
//     res.json({ message: 'OK' });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

//////////////////////******////////////////////////////////////

// app.put('/testimonials/:id', (req, res) => {
//   const testimonial = testimonials.find((t) => t.id == req.params.id);
//   if (!testimonial) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     const { author, text } = req.body;
//     if (!author && !text) {
//       res.status(400).json({ message: 'Author or text is required' });
//     } else {
//       if (author) testimonial.author = author;
//       if (text) testimonial.text = text;
//       res.json({ message: 'OK' });
//     }
//   }
// });

// router.route('/testimonials/:id').put((req, res) => {
//   const testimonial = testimonials.find((t) => t.id == req.params.id);
//   if (!testimonial) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     const { author, text } = req.body;
//     if (!author && !text) {
//       res.status(400).json({ message: 'Author or text is required' });
//     } else {
//       if (author) testimonial.author = author;
//       if (text) testimonial.text = text;
//       res.json({ message: 'OK' });
//     }
//   }
// });

// router.put('/testimonials/:id', async (req, res) => {
//   const { author, text } = req.body;

//   try {
//     const testim = await Testimonial.findByIdAndUpdate(
//       req.params.id,
//       { author: author, text: text },
//       { new: true }
//     );
//     if (testim) {
//       res.json(testim);
//     } else {
//       res.status(404).json({ message: 'Not found...' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

//////////////////////******////////////////////////////////////

// app.delete('/testimonials/:id', (req, res) => {
//   const index = testimonials.findIndex((t) => t.id == req.params.id);
//   if (index === -1) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     testimonials.splice(index, 1);
//     res.json({ message: 'OK' });
//   }
// });

// router.route('/testimonials/:id').delete((req, res) => {
//   const index = testimonials.findIndex((t) => t.id == req.params.id);
//   if (index === -1) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     testimonials.splice(index, 1);
//     res.json({ message: 'OK' });
//   }
// });

// router.delete('/testimonials/:id', async (req, res) => {
//   try {
//     const testim = await Testimonial.findByIdAndDelete(req.params.id);
//     if (testim) {
//       res.json(testim);
//     } else {
//       res.status(404).json({ message: 'Not found...' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// module.exports = router;
