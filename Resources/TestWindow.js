exports.TestWindow = function(navController) {
	
	var win = Ti.UI.createWindow({
		title:'Window ' + controller.windowStack.length,
		backgroundColor:'#fff',
		layout:'vertical'
	});
	
	var add = Ti.UI.createButton({
		title:'Add Window',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	add.addEventListener('click', function() {
		navController.open(new TestWindow(navController));
	});
	win.add(add);
	
	var home = Ti.UI.createButton({
		title: 'Go Home',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	home.addEventListener('click', function() {
		navController.home();
	});
	win.add(home);	
	
	return win;
};
