require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const authenticationRouter = require('./routes/authentication.route');
const studentDataRouter = require('./routes/studentData.route');
const tutorsDataRouter = require('./routes/tutorsData.route');
const videosRouter = require('./routes/videos.route');
const servicesRouter = require('./routes/services.route');
const paymentRouter = require('./routes/payment.route');
const reviewRouter = require('./routes/review.route');
const categoriesRouter = require('./routes/categories.route');
const searchRouter = require('./routes/search.route');
const adsRouter = require('./routes/ads.route');
const requestRouter = require('./routes/tutorialRequests.route');
const pendingTutorialsRouter = require('./routes/pendingTutorials.route');
const historyRouter = require('./routes/history.route');
const boughtVideosRouter = require('./routes/boughtVideos.route');
const rankRouter = require('./routes/rank.route');
const otpRouter = require('./routes/otp.route');
const callbackRouter = require('./routes/callback.route');
const appDataRouter = require('./routes/appData.route');
 

const app = express(); 

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/student', studentDataRouter);
app.use('/tutors/', tutorsDataRouter);
app.use('/authentication/', authenticationRouter);
app.use('/videos/', videosRouter);
app.use('/services/', servicesRouter);
app.use('/search/', searchRouter);
app.use('/reviews/', reviewRouter);
app.use('/categories/', categoriesRouter);
app.use('/requests/', requestRouter);
app.use('/ads/', adsRouter);
app.use('/payment/', paymentRouter);
app.use('/pending/', pendingTutorialsRouter);
app.use('/history/', historyRouter);
app.use('/boughtVideos/', boughtVideosRouter);
app.use('/rank/', rankRouter);
app.use('/otp/', otpRouter);
app.use('/callback/', callbackRouter);
app.use('/appData/', appDataRouter);


module.exports = app;

