const express = require('express');
const mongoose = require('mongoose');
const dotnev = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8060;

dotnev.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(bodyParser.json());

//MongoDB Connection
mongoose.connect(process.env.MONGO_STRING, {
    w: 'majority',
}).then( () => {
    console.log('MongoDB Connected');

}).catch((err) => {
    console.error('MongoDB Connection Error:', err)
});

// Routes    
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessUserRoutes');

const categoryRoutes = require("./routes/categories");
app.use('/api/users', userRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/categories', categoryRoutes);

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});