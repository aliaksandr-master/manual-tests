"use strict";

window.cid = (function () {
	var c = 0;
	return function () {
		return c++;
	};
})();

window.View = window.Class.extend({

	containerMethod: 'html',

	initialize: function (model, done) {
		this.model = model || {};
		this._done = done;
		if (this.autoRender) {
			this.render();
		}

	},

	autoRender: true,

	template: function (data) { return ''; },

	render: function () {
		console.log(this.template);
		var data = this.getTemplateData();
		var html = this.template(data);
		this.el()[this.containerMethod](html);
		this.delegateEvent();
	},

	_initEvents: function () {
		if (_.isArray(this.events)) {
			return;
		}
		var EVENT_EXP = /^([a-z0-9_-]+)\s+(.*)$/;
		var events = [];
		_.each(this.events, function (eventHandler, eventStr) {
			eventStr = String(eventStr || '');
			events.push({
				name: eventStr.replace(EVENT_EXP, '$1') +'.ev'+ window.cid(),
				handler: eventHandler,
				selector: eventStr.replace(EVENT_EXP, '$2') || null
			});
		});
		this.events = events;
	},

	delegateEvent: function () {
		this._initEvents();
		var that = this;
		_.each(this.events, function (ev) {
			if (!_.isFunction(that[ev.handler]) ) {
				throw new Error('undefined event handler "' + ev.handler + '"');
			}
			that.el().on(ev.name, ev.selector, _.bind(that[ev.handler],that));
		});
	},

	clean: function () {
		var that = this;
		this._initEvents();
		_.each(this.events, function (event) {
			that.el().off(event.name);
		});
		this.removeEl();
	},

	getTemplateData: function () { return _.cloneDeep(this.model); },

	el: function (search) { return $([]); },

	removeEl: function () {
		this.el().remove();
	},

	done: function () {
		if (this._done) {
			this.clean();
			this._done(this.model);
		}
	}
});
