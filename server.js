const express = require('express');
const app = express();
const cors = require('cors');

const testimonialRoutes = require('./testimonials.routes');
const concertsRoutes = require('./concerts.routes');
const seatsRoutes = require('./seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', testimonialRoutes); // add testimonial routes to server
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
// const db = require('./db');
// const testimonials = db.testimonials;

// app.get('/testimonials', (req, res) => {
//   res.json(testimonials);
// });

// app.get('/testimonials/random', (req, res) => {
//   const randomTestimonial =
//     testimonials[Math.floor(Math.random() * testimonials.length)];
//   res.json(randomTestimonial);
//   console.log('random', randomTestimonial);
// });

// app.get('/testimonials/:id', (req, res) => {
//   const testimonial = testimonials.find((t) => t.id == req.params.id);

//   if (!testimonial) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     res.json(testimonial);
//   }
// });

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

// app.delete('/testimonials/:id', (req, res) => {
//   const index = testimonials.findIndex((t) => t.id == req.params.id);
//   if (index === -1) {
//     res.status(404).json({ message: 'Testimonial not found' });
//   } else {
//     testimonials.splice(index, 1);
//     res.json({ message: 'OK' });
//   }
// });

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8080, () => {
  console.log('Server is running on port: 8080');
});
