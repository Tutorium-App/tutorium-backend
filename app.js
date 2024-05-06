const express = require('express');
const bodyParser = require('body-parser');
const authenticationRouter = require('./routes/authentication.route');
const studentDataRouter = require('./routes/studentData.route');
const tutorsDataRouter = require('./routes/tutorsData.route');
const videosRouter = require('./routes/videos.route');
const servicesRouter = require('./routes/services.route');
const paymentRouter = require('./routes/payment.route');
const reviewRouter = require('./routes/review.route');
const searchRouter = require('./routes/search.route');
const adsRouter = require('./routes/ads.route');
const requestRouter = require('./routes/tutorialRequests.route');
 

const app = express(); 

app.use(bodyParser.json());

app.use('/student', studentDataRouter);
app.use('/tutors/', tutorsDataRouter);
app.use('/authentication/', authenticationRouter);
app.use('/videos/', videosRouter);
app.use('/services/', servicesRouter);
app.use('/search/', searchRouter);
app.use('/reviews/', reviewRouter);
app.use('/requests/', requestRouter);
app.use('/ads/', adsRouter);
app.use('/payment/', paymentRouter);


module.exports = app;

