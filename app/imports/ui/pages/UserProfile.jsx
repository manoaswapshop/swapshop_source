import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Loader, Header, Icon, Table, Image } from 'semantic-ui-react';
import { Users, UserSchema } from '/imports/api/user/user';
import AutoForm from 'uniforms-semantic/AutoForm';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const columnTwo = { paddingLeft: '50px' };
    const containerStyle = { paddingTop: '50px', paddingBottom: '50px' };
    return (
        <Container>
          {this.props.users.map((user, index) =>
              <User key={index}
                    user={user}/>)}
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  user: PropTypes.object,
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('AllUsers');
  const subscription2 = Meteor.subscribe('AllStuff');
  const userId = match.params._id;
  return {
    user: Users.findOne(userId),
    stuffs: Stuffs.find("jRqKqvbJkDYxihvBA"),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserProfile);
