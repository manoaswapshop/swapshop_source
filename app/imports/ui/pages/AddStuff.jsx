import React from 'react';
import { Stuffs, StuffSchema } from '/imports/api/stuff/stuff';
import { Users, UserSchema } from '/imports/api/user/user';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = { image: '' };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, category, condition, price, location, image, description } = data;
    const owner = Meteor.user().username;
    const userId = '';
    Stuffs.insert({ name, category, condition, price, location, image, description, owner, userId }, this.insertCallback);
  }

  handleDrop = files => {

    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'qkwytuwz');
      formData.append('api_key', '951522161423524');
      formData.append('timestamp', Date.now());

      return axios.post('https://api.cloudinary.com/v1_1/manoa-swap-shop/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url;
        this.imageURL = fileURL;
        this.setState({ image: fileURL });
        console.log(data);
        console.log(this.imageURL);
      });

    });

    axios.all(uploaders).then(() => {

    });
  };

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    // noinspection JSAnnotator
    return (
        <div className='background-image'>
          <Grid container centered>
            <Grid.Column>
              <Header inverted as="h2" textAlign="center">List an Item</Header>
              <AutoForm ref={(ref) => { this.formRef = ref; }} schema={StuffSchema} onSubmit={this.submit}>
                <Segment>
                  <TextField name='name'/>
                  <SelectField name='category'/>
                  <SelectField name='condition'/>
                  <NumField name='price' decimal={true}/>
                  <SelectField name='location'/>
                  <LongTextField editable={'false'} name='image' value={this.state.image}/>
                  <Dropzone
                      onDrop={this.handleDrop}
                      multiple
                      accept="image/*">
                    <p>Drop your files or click here to upload</p>
                    <Image width={'100'} height={'100'} src={this.state.image} circular/>
                  </Dropzone>
                  <TextField name='description'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                  <HiddenField name='userId' value={this.props.user._id}/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

AddStuff.propTypes = {
  user: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    user: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AddStuff);