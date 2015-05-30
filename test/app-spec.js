describe('TimeFactory', function() {

	var factory; 
	beforeEach(function() {
		module('CityClock');
		inject(function($injector) {
			factory = $injector.get('TimeFactory');
		})
	})

	describe('TimeFactory', function() {
		describe('formatAMPM', function() {
			it('should give time in 12hours format', function() {
				var formatedDate = factory.formatAMPM(new Date());
				expect(formatedDate).toBeDefined();
			})
			it('should return date object for the offset', function() {
				var dateObj = factory.calcTime(3600);
				expect(dateObj).toBeDefined();
			})
		})
	})
})
describe('cityClock Directive', function() {
	var $scope,
		el,
		simpleHtml = '<city-clock city="London"></city-clock>',
		factory,
		service,
		latLonRequestHandler,
		timeRequesthandler;


	beforeEach(function() {
		module('CityClock');
		inject(function($rootScope, $compile, $httpBackend) {
			$scope = $rootScope.$new();
			var cityName = 'Chennai';
			var mockData = {}
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + cityName + '&sensor=false';
			$httpBackend.whenJSONP(url).respond(mockData);
			compiledElement = $compile(simpleHtml)($scope);
			$scope.$digest();
		})
	});
	

	it('element in the DOM', function() {
		expect(compiledElement).toBeDefined();
	});	

})