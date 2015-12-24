//code shared between client and server

// collections
Items = new Mongo.Collection("items");
Happenings = new Mongo.Collection("happenings");

// routes
Router.route('/', function () {
	Session.set('happening', null);
	this.render('start');
});

Router.route('/admin', function () {
	Session.set('happening', null);
	this.render('admin');
});

Router.route('/events/:identifier', function () {
	var params = this.params;
	var identifier = params.identifier;

	var happening = Happenings.findOne({identifier: identifier});
	Session.set('happening', happening);

	this.render('happening', {data: happening});
});
