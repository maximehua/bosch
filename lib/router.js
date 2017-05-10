FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render('layout', { yield: "parcelleList"});
	}
});

FlowRouter.route('/parcelle/:id', {
	action: function(param) {
		BlazeLayout.render('layout', { yield: "parcelle"});
	}
});

FlowRouter.route('/parcelle/:id/meteo/:donnee', {
	action: function(param) {
		BlazeLayout.render('layout', { yield: "meteo"});
	}
});
