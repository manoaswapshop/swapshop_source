import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/stuff.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('AllStuff', function publish() {
  return Stuffs.find()
});

Meteor.publish('Clothing', function publish() {
  return Stuffs.find({ category: 'clothing' });
});
Meteor.publish('Textbooks', function publish() {
  return Stuffs.find({ category: 'textbooks' });
});
Meteor.publish('Electronics', function publish() {
  return Stuffs.find({ category: 'electronics' });
});
Meteor.publish('Furniture', function publish() {
  return Stuffs.find({ category: 'furniture' });
});
/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});
