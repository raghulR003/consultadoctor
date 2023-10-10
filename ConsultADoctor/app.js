const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// MongoDB Atlas connection URL
const mongoURI = 'mongodb+srv://user1:root@initialload.qj5mr8z.mongodb.net/virtuwell-db?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a Mongoose schema
const doctorSchema = new mongoose.Schema({
  ID: Number,
  Name: String,
  Specialization: String,
  Location: String,
  Phone: String,
  Email: String,
  'Availability-1': String,
  'Availability-2': String,
  'Charge per Hour': Number,
  Rank: Number,
});

// Create a Mongoose model
const Doctor = mongoose.model('Doctor', doctorSchema);

// Define a route to retrieve and display the doctor data
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});