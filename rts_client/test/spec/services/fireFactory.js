'use strict';

describe('Service: fireFactory', function () {

  // load the service's module
  beforeEach(module('rtsClientApp'));

  // instantiate service
  var fireFactory;
  beforeEach(inject(function (_fireFactory_) {
    fireFactory = _fireFactory_;
  }));

  it('should do something', function () {
    expect(!!fireFactory).toBe(true);
  });

});
