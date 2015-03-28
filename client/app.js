// counter starts at 0
//Session.setDefault('counter', 0);

Template.topic.events({
    'click .add': function () {
        Items.insert({name: 'Neues Element', notes: '', person: ''});
    }
});

Template.items_assigned.helpers({
    items: function () {
        return Items.find({person: {$ne: ''}}, {sort: {person: 1}});
    }
});

Template.items_unassigned.helpers({
    items: function () {
        return Items.find({person: ''});
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
/*
    'click .item.unassigned': function () {
        Items.update(this._id, {$set: {person: 'Ingmar was here for no reason'}});
    },
    'click .item.assigned': function () {
        Items.update(this._id, {$set: {person: null}});
    }
*/
});
