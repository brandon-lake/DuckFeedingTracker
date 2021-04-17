const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

// connect to db
const connectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Successfully connected to MongoDB!");
});

const routesHandler = require('./routes/routesHandler');
app.use("/", routesHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});