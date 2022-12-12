const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const roomRoute = require('./routes/roomRoute');
const messageRoute = require('./routes/messageRoute');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRoute);
app.use('/api/room', roomRoute);
app.use('/api/messages', messageRoute);

app.use(errorMiddleware);

module.exports = app;