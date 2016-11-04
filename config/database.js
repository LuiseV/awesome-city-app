module.exports = {
  remoteURL : process.env.MONGO_URI,
  localURL : process.env.MONGO_URI || 'mongodb://127.0.0.1/luiseApp'
};
