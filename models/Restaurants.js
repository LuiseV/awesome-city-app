var mongoose = require('mongoose');

var RestSchema = new mongoose.Schema({
  title: String,
  rating: Number
});

RestSchema.methods.upvote = function(cb) {
  this.rating += 1;
  this.save(cb);
};

mongoose.model('Restaurants', RestSchema);
