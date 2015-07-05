(function() {
var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;
angular.module('CityClock', [])
.directive('ngCityClock', ['$interval', 'TimeFactory', 'TimeService', function($interval, TimeFactory, TimeService) {
    return {
        restrict : 'E',
        scope: {},
        templateUrl: currentScriptPath.replace('ngcityclock.js', 'templates/clock.html'),
        link: function(scope, elem, attrs) {
            if(typeof attrs.city !== 'undefined') {
                scope.city = attrs.city;
                TimeService.getLatLon(scope.city).then(function(response) {
                if(response.data.results[0].geometry.location.lat) {
                    var lat = response.data.results[0].geometry.location.lat;
                    var lon = response.data.results[0].geometry.location.lng;
                    TimeService.getCorrectTime(lat, lon).then(function(response) {
                        if(typeof response.data.rawOffset !== 'undefined') {
                            scope.actTime = TimeFactory.calcTime(response.data.rawOffset+response.data.dstOffset);
                            if(scope.actTime) {
                                $interval(function() {
                                    if(typeof scope.timeStamp !== 'undefined') {
                                        scope.timeStamp += 1000;
                                    }
                                    else {
                                        scope.dateObj = scope.actTime; //new Date(scope.actTime);
                                        scope.timeStamp = scope.dateObj.getTime()+1000;
                                    }
                                    scope.dateObj = new Date(scope.timeStamp);
                                    scope.currentTime = TimeFactory.formatAMPM(scope.dateObj);
                                }, 1000);
                            }
                        }
                    });
                }
                });
            }
        }
    };
}])
.service('TimeService', ['$http', function($http) {
    this.getLatLon = function(cityName) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + cityName + '&sensor=false');
    };
    this.getCorrectTime = function(lat, lon, timeStamp) {
        myDate = new Date();
        return $http.get('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lon+'&timestamp='+(myDate.getTime()/1000));
    };
}])
.factory('TimeFactory', function() {
    TimeFactory = {};

    TimeFactory.formatAMPM = function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    };

    TimeFactory.calcTime = function(offset) {

        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (1000*offset));
        return nd;
    };
    return TimeFactory;
});
})();
