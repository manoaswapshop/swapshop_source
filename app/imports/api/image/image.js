import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Images = new Mongo.Collection('images');

Images.attachSchema(new SimpleSchema({
  image: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      },
    },
  },
}));

