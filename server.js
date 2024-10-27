const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection string
const uri = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a schema for the data
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const Data = mongoose.model('Data', dataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public folder

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const newData = new Data({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  });

  newData.save()
    .then(() => {
      res.send('Data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
