import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/user/user';
import User from '/imports/ui/components/User';

class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
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
Profile.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('AllUsers');
  return {
    users: Users.findOne(documentId).fetch(),
    ready: (subscription.ready()),
  };
})(Profile);
