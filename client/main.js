import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from '../shared/main.js';
import { Tasks } from '../shared/main.js';

import './main.html';

Meteor.subscribe('tasks');

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