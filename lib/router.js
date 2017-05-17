FlowRouter.route('/', {
	name: "parcellesList",
	action: function() {
		BlazeLayout.render('layout', { yield: "parcelleList"});
	}
});

FlowRouter.route('/parcelle/:id', {
	name: "parcelle",
	action: function(param) {
		BlazeLayout.render('layout', { yield: "parcelle"});
	}
});

FlowRouter.route('/parcelle/:id/meteo/:donnee', {
	name: "meteo",
	action: function(param) {
		BlazeLayout.render('layout', { yield: "meteo"});
	}
});
