require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
