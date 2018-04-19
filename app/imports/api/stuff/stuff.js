import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Stuffs = new Mongo.Collection('Stuffs');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StuffSchema = new SimpleSchema({
  name: String,
  category: {
    type: String,
    allowedValues: ['clothing', 'textbooks', 'electronics', 'furniture'],
    defaultValue: 'textbooks',
  },
  price: Number,
  owner: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
  location: {
    type: String,
    allowedValues: ['Campus Center', 'Campus Center Courtyard', 'Hamilton Library'],
    defaultValue: 'Campus Center',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Stuffs.attachSchema(StuffSchema);

/** Make the collection and schema available to other code. */
export { Stuffs, StuffSchema };
