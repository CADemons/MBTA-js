const StopsByRoute = require('../src/stops/StopsByRoute');
var routes = new StopsByRoute("Red");
console.log(routes.getDirectionByName("Southbound"));
//console.log(routes.checkHide("72/75"));
