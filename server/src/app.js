const express = require('express');

const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const trainingRoutes = require('./routes/trainings');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/trainings', trainingRoutes);

const PORT = process.env.PORT || 6100;

app.listen(PORT, () => {
  console.log(`Serveur prêt sur http://localhost:${PORT}`);
});