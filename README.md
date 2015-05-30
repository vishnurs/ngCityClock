# ngCityClock
An AngularJS Directive to show the clock of any city in the world.

The directive makes use of Google *GeoCode* and *TimeZone* APIs.

## How to Use the directive?

* Include the directive file *app.js*
* Inject the *CityClock* module as dependency to your app module.

Example

```
angular.module('myApp', ['CityClock'])
.controller('myController', function() {
});
```

Add the following markup to your HTML file.

```
<ng-city-clock city="Trivandrum"></ng-city-clock>
```
Where *city* is the clock of the city you wants to show.

We can have more than one city clocks in a single page

Example
```
<ng-city-clock city="Washington"></ng-city-clock>
<ng-city-clock city="Trivandrum"></ng-city-clock>
```

## Contributing

Pull requests are appreciated.


## Licence

MIT Licence
