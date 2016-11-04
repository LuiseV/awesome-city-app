var mongoose = require('mongoose');
var Rest = mongoose.model('Restaurants');

module.exports = function (app) {
  app.param('rest', function(req, res, next, id) {
    var query = Rest.findById(id);
    query.exec(function(err, rest) {
      if (err) { return next(err); }
      if (!rest) {return next(new Error('cannot find restaurant')); }

      req.rest = rest;
      return next();

    });
  });

  app.get('/rests', function(req, res, next) {
    Rest.find(function(err, rests) {
      if (err) { return next(err); }
      res.json(rests);
    });
  });

  app.post('/rests', function(req, res, next) {
    var rest = new Rest(req.body);
    rest.save(function(err, rest) {
      if (err) { return err; }
      res.json(rest);
    });
  });

  app.put('/rests/:rest/upvote', function(req, res, next) {
    req.rest.upvote(function(err, rest) {
      if (err) { return next(err); }
      res.json(rest);
    });
  });


  app.delete('/rests/:rest/delete', function(req, res, next) {
    Rest.remove({_id: req.rest._id}, function(err, rest) {
      if (err) { return next(err); }
      res.json(rest);
    });
  });

  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/../public/index.html');
  });

};
