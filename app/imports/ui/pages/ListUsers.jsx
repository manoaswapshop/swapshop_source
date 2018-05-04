import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Header, Loader } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import UserTable from '/imports/ui/components/UserTable';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUsers extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='background-image'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>All Users</Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>UH Number</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Owner</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.users.map((user) => <UserTable key={user._id} user={user} />)}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListUsers.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('AllUsers');
  return {
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListUsers);
