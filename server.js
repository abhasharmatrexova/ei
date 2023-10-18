const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from your Angular app's domain
const allowedOrigins = ['http://localhost:4300'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// ... other middleware and routes ...

app.listen(8000, () => {
  console.log('Server is running on port 800sss0');
});
