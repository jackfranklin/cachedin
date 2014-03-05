var moment = require('moment');

var CachedMemoryAdapter = function() {
  this._store = {};
  // key: [time, val]
};

CachedMemoryAdapter.prototype._findByKey = function(key) {
  if(this._store[key]) {
    return this._store[key][1];
  } else {
    return undefined;
  }
};

CachedMemoryAdapter.prototype.hasExpired = function(key) {
  var lastValid = moment().subtract('seconds', this.expire);
  return lastValid.isAfter(this._store[key][0]);
};

CachedMemoryAdapter.prototype.load = function(key) {
  return this._findByKey(key);
};

CachedMemoryAdapter.prototype.save = function(key, value) {
  this._store[key] = [moment(), value];
};

CachedMemoryAdapter.prototype.clear = function(key) {
  if(key) {
    delete this._store[key];
  } else {
    this._store = {};
  }

};

module.exports = CachedMemoryAdapter;
