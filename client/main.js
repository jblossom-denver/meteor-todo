import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Tasks = new Mongo.Collection('tasks');

Meteor.subscribe('tasks');

Meteor.methods({
  addTask: function(name) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('No Access!');
    }

    Tasks.insert({
      name: name,
      createdAt: new Date(),
      userId: Meteor.userId()
    });
  },
  deleteTask: function(task) {
    Tasks.remove(task._id);
  }
});

Template.list.helpers({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } })
});

Template.list.events({
  "click .delete-task": function(event) {
    if(confirm("Are you sure you want to delete '"+this.name+"' ?")) {
      Meteor.call('deleteTask', this);
    }
    return false;
  }
});

Template.form.events({
  "submit .add-task": function(event) {
    var name = event.target.name.value;

    Meteor.call('addTask', name);

    event.target.name.value = "";

    return false;
  }
});