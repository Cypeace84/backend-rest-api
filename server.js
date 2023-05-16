const express = require('express');
const app = express();
const cors = require('cors');

const testimonialRoutes = require('./testimonials.routes');
const concertsRoutes = require('./concerts.routes');
const seatsRoutes = require('./seats.routes');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', testimonialRoutes); // add testimonial routes to server
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8080, () => {
  console.log('Server is running on port: 8080');
});
