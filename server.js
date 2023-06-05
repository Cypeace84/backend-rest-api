const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const testimonialRoutes = require('./testimonials.routes');
const concertsRoutes = require('./concerts.routes');
const seatsRoutes = require('./seats.routes');
const socket = require('socket.io');

const port = 8001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//////*/////
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });
//////
app.use('/api', testimonialRoutes); // add testimonial routes to server
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// app.listen(8080, () => {
//   console.log('Server is running on port: 8080');
// });

///////*///////
// connects our backend code with the database
// mongoose.connect('mongodb://localhost:27017/NewWaveDB', {
//   useNewUrlParser: true,
// });
mongoose.connect(
  'mongodb+srv://cyprianadamski:1Kodilla@cluster0.tfesxu0.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));
/////////*/////////

const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// const io = socket(server);
const io = socket(server, { cors: { origin: 'http://localhost:3000' } });

io.on('connection', (socket) => {
  console.log('New socket');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
});

// app.listen(process.env.PORT || 8001, () => {
//   console.log('Server is running on port: 8001');
// });
