var NavigationController = require('NavigationController').NavigationController,
	TestWindow = require('TestWindow').TestWindow;

// Create NavigationController which will drive application	
var controller = new NavigationController();

// Open initial window
controller.open(new TestWindow(controller));
