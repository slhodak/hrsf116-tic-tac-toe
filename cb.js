var object = {};

var hasCallback = function(callback) {
	object.a = 1;
	callback(object);
};

var isCallback = function(obj) {
	obj.b = 2;
};

hasCallback(isCallback);
console.log(object);

//  What does object look like after the last line of code above is run?