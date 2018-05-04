import React from 'react';
import { Grid, Loader, Header, Segment, Image } from 'semantic-ui-react';
import { Users, UserSchema } from '/imports/api/user/user';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';

/** Renders the Page for editing a single document. */
class EditUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.formRef = null;
    this.state = { image: '' };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, userEmail, phoneNumber, uhNumber, image, description, _id } = data;
    Users.update(_id, {
      $set: {
        firstName,
        lastName,
        userEmail,
        phoneNumber,
        uhNumber,
        image,
        description,
      },
    }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
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

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const editStyle = { paddingLeft: '20px', paddingRight: '700px' };
    return (
        <Grid container centered>
          <Grid.Column style={editStyle}>
            <Header as="h2" textAlign="center" inverted>Edit User Profile</Header>
            <AutoForm schema={UserSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <TextField name='userEmail'/>
                <TextField name='phoneNumber'/>
                <TextField name='uhNumber'/>
                <LongTextField editable={'false'} name='image' value={this.state.image}/>
                <Dropzone
                    onDrop={this.handleDrop}
                    multiple
                    accept="image/*">
                  <p>Drop your files or click here to upload</p>
                  <Image width={'100'} height={'100'} src={this.state.image} circular/>
                </Dropzone>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use. */
EditUserProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contacts documents.
  const subscription = Meteor.subscribe('Users');
  return {
    doc: Users.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditUserProfile);

