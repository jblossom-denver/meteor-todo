import { Meteor } from 'meteor/meteor';

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

export { Tasks };
export { Meteor };