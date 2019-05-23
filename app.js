import config from './config';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users';
import tasksRouter from './routes/tasks';

mongoose.connect(config.dbHost, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Connected to Database...'))
    .catch(() => {
        console.log("Can't connect to Database. Exiting.")
        process.exit(1);
    })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(cors({ credentials: true, origin: true,  exposedHeaders: 'token' }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/account', usersRouter);
app.use('/api/tasks', tasksRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
