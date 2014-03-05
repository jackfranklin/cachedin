var CachedIn = function(options) {
  this._adapter = options.adapter;
  this._adapter.expire = options.expire;
};

CachedIn.version = '0.0.0';
CachedIn.Adapters = {
  Memory: require('./adapters/memory.js')
};

CachedIn.prototype.load = function(key) {
  return this._adapter.load(key);
};

CachedIn.prototype.hasExpired = function(key) {
  return this._adapter.hasExpired(key);
};

CachedIn.prototype.save = function(key, value) {
  return this._adapter.save(key, value);
};

CachedIn.prototype.clear = function(key) {
  return this._adapter.clear(key);
};

module.exports = CachedIn;
