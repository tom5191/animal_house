const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyParser');
const mongoose = require('mongoose');
const config = require('config');
const fs = require('fs')
const waterfall = require('async-waterfall');

app.use(bodyParser());

const connectMongo = () => {
  mongoose.connect(config.get('Mongo.uri'), {
    useCreateIndex: true,
    useNewUrlParser: true
  }).then(() => console.log('Mongoose connected...'))
    .catch(err => console.error(err));
}

const requireModels = () => {
  fs.readdir('api/models', (err, files) => {
    files.forEach(file => {
      require('./api/models/' + file);
    });
  });
}

const requireControllers = () => {
  fs.readdir('api/controllers', (err, files) => {
    files.forEach(file => {
      require('./api/controllers/' + file);
    });
  });
}

waterfall([requireModels, requireControllers, connectMongo], (err) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }
  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
});
