import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Tasks = new Mongo.Collection('tasks');

Template.list.helpers({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } })
});

Template.list.events({
  "click .delete-task": function(event) {
    if(confirm("Are you sure you want to delete '"+this.name+"' ?")) {
      Tasks.remove(this._id);
    }
    return false;
  }
});

Template.form.events({
  "submit .add-task": function(event) {
    var name = event.target.name.value;

    Tasks.insert({
      name: name,
      createdAt: new Date(),
      userId: Meteor.userId()
    });

    event.target.name.value = "";

    return false;
  }
});