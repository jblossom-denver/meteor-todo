import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Tasks = new Mongo.Collection('tasks');

Template.list.helpers({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } })
});

Template.form.events({
  "submit .add-task": function(event) {
    var name = event.target.name.value;
    // console.log(name);

    Tasks.insert({
      name: name,
      createdAt: new Date()
    });

    event.target.name.value = "";
    
    return false;
  }
});