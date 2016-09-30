import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// for this demo, below code is duplicated in client.
// normally I would pull this out to a common include.

Tasks = new Mongo.Collection('tasks');

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