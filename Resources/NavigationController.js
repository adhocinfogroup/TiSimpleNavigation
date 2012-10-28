exports.NavigationController = function() {
	this.windowStack = [];
};

exports.NavigationController.prototype.open = function(/*Ti.UI.Window*/windowToOpen) {
	// Add the windows to the stack of windows managed by the controller
	this.windowStack.push(windowToOpen);
	
	// Grab a copy of the current nav controller for use in the callback
	var that = this;
	windowToOpen.addEventListener('close', function() {
		that.windowStack.pop();
	});
	
	windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;
	
	// This is the first window
	if (this.windowStack.length === 1) {
		if (Ti.Platform.osname === 'android') {
			windowToOpen.exitOnClose = true;
			windowToOpen.open();
		} else {
			this.navGroup = Ti.UI.iPhone.createNavigationGroup({
				window : windowToOpen
			});
			var containerWindow = Ti.UI.createWindow();
			containerWindow.add(this.navGroup);
			containerWindow.open();
		}
	} else { // All subsequent windows
		if (Ti.Platform.osname === 'android') {
			windowToOpen.open();
		} else {
			this.navGroup.open(windowToOpen);
		}
	}
};

// Go back to the initial window of the navifation controller
exports.NavigationController.prototype.home = function() {
	// Store a copy of all the current windows on the stack
	var windows = this.windowStack.concat([]);
	
	for(var i = 1, l = windows.length; i < l; i++) {
		(this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
	}
	this.windowStack = [this.windowStack[1]]; 
};
