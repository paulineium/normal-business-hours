// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to check working hours
app.use(workingHours);

// Serving static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
});

// Custom middleware function to check working hours
function workingHours(req, res, next) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const normalBusinessHours = {
    open: 7,
    close: 22,
  };

  if (
    currentHour >= normalBusinessHours.open &&
    currentHour <= normalBusinessHours.close
  ) {
    // If within normal business hours, proceed to static file serving
    console.log('Open! 🔓');
    next();
  } else {
    // If outside normal business hours, serve the denied.html file
    console.log('Closed 🔒');
    req.url = '/denied.html';
    next();
  }
}
