import { Meteor } from '../shared/main.js';
import { Tasks } from '../shared/main.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('tasks', function(){
  return Tasks.find({
    userId: this.userId
  });
});