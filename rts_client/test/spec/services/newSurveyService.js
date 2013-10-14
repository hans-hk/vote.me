'use strict';

describe('Service: newSurveyService', function () {

  // load the service's module
  beforeEach(module('rtsClientApp'));

  // instantiate service
  var newSurveyService;
  beforeEach(inject(function (_newSurveyService_) {
    newSurveyService = _newSurveyService_;
  }));

  it('should do something', function () {
    expect(!!newSurveyService).toBe(true);
  });

});
