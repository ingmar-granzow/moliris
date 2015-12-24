// counter starts at 0
//Session.setDefault('counter', 0);

Template.admin.helpers({
    happenings: function () {
        return Happenings.find();
    }
});

Template.start.events({
    'click .create': function (event) {
        var happening = $(event.target).closest('.happening');
        var newName = happening.find('input.happening').val();

        var uuid = Meteor.uuid();
        Happenings.insert({name: newName, identifier: uuid});

        Router.go('/events/' + uuid);
    }
});

Template.happening.events({
    'click .add': function () {
        var happening = Session.get('happening');
        Items.insert({happeningID: happening._id, name: 'Neues Element', notes: '', person: '', date: new Date()});
    }
});

Template.items_assigned.helpers({
    items: function () {
        var happening = Session.get('happening');
        return Items.find({happeningID: happening ? happening._id : null, person: {$ne: ''}}, {sort: {person: 1}});
    }
});

Template.items_unassigned.helpers({
    items: function () {
        var happening = Session.get('happening');
        return Items.find({happeningID: happening ? happening._id : null, person: ''}, {sort: {date: -1}});
    }
});

Template.item.helpers({
    assigned: function () {
        var item = Items.findOne(this._id);
        return item.person ? "assigned" : "unassigned";
    },
    hasNotes: function () {
        var item = Items.findOne(this._id);
        return item.notes;
    }
});

Template.item.events({
    'click .delete': function (event) {
        event.stopPropagation();
        Items.remove(this._id);
    },
    'click .edit': function (event) {
        event.stopPropagation();
        $(event.target).closest('.item').addClass('edit');
    },
    'click .submit': function (event) {
        var item = $(event.target).closest('.item');
        var newName = item.find('input.name').val();
        var newNotes = item.find('textarea.notes').val();
        var newPerson = item.find('input.person').val();

        Items.update(this._id, {$set: {name: newName, notes: newNotes, person: newPerson}});
        item.removeClass('edit');
        event.stopPropagation();
    },
    'click .cancel': function (event) {
        event.stopPropagation();
        $(event.target).closest('.item').removeClass('edit');
    }
});
