//server only code

Meteor.startup(function () {
    if (Items.find().count() === 0) {
        var names = ["Bang!", "Carcassone", "Dixit"];
        _.each(names, function (name) {
            Items.insert({
                name: name,
                notes: '',
                person: '',
                date: new Date()
            });
        });
    }
});
