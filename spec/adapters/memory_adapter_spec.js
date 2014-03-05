var CachedIn = require('../../index.js');

describe('CachedIn Memory Adapter', function() {
  var cache;
  beforeEach(function() {
    cache = new CachedIn({
      adapter: new CachedIn.Adapters.Memory(),
      expire: 1 * 60 * 60 // one hour
    });
  });

  it('should be able to save things', function() {
    cache.save('foo', 2);
    expect(cache.load('foo')).toBe(2);
  });

  it('should be able to clear a key', function() {
    cache.save('foo', 5);
    cache.clear('foo');
    expect(cache.load('foo')).toBeUndefined();
  });

  it('should be able to clear everything', function() {
    cache.save('foo', 5);
    cache.save('bar', 5);
    cache.clear();
    expect(cache.load('foo')).toBeUndefined();
    expect(cache.load('bar')).toBeUndefined();
  });

  it('should know if an entry is out of date', function() {
    cache.save('foo', 5);
    cache._adapter._store['foo'][0] = new Date('October 13, 1975 11:13:00');
    expect(cache.hasExpired('foo')).toBe(true);
  });

  it('should know if an entry is in date', function() {
    cache.save('foo', 5);
    expect(cache.hasExpired('foo')).toBe(false);
  });
});
