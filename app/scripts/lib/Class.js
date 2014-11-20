"use strict";

window.Class = (function () {
	var cid = 0;
	var Class = function () {
		this.cid = cid++;
		this.initialize.apply(this, arguments);
	};
	Class.prototype = {
		initialize: function () {}
	};

	Class.create = function (a,b,c,d,e,f,g,h,i) {
		return new this(a,b,c,d,e,f,g,h,i);
	};

	Class.extend = function(protoProps, staticProps) {
		var child,
			parent = this;

		if (protoProps && _.has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){
				return parent.apply(this, arguments);
			};
		}

		_.extend(child, parent, staticProps);

		var Surrogate = function(){
			this.constructor = child;
		};

		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();

		if (protoProps) {
			_.extend(child.prototype, protoProps);
		}

		child.__super__ = parent.prototype;

		return child;
	};

	return Class;
})();
