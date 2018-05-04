import React from 'react';
import { Container, Grid, Image, Header, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '/imports/api/stuff/stuff';
import { Meteor } from 'meteor/meteor';
import StuffItemAdmin from '/imports/ui/components/StuffItemAdmin';

class User extends React.Component {

  render() {
    const columnTwo = { paddingLeft: '50px' };
    const containerStyle = { paddingTop: '50px', paddingBottom: '50px' };
    return (
        <Container style={containerStyle}>
          <Grid columns={2}>
            <Grid.Column width={4}>
              <Image
                 size='medium'
                  src={this.props.user.image}
                  circular/>
              <hr/>
              <Grid.Row>
                <Header size='medium'> Contact Information </Header>
              </Grid.Row>
              <Grid.Row>
                <Icon name='envelope'/> {this.props.user.userEmail}
              </Grid.Row>
              <Grid.Row>
                <Icon name='phone'/> {this.props.user.phoneNumber}
              </Grid.Row>
              <Grid.Row>
                UH Number: {this.props.user.uhNumber}
              </Grid.Row>
              <Grid.Row>
                Short Description: {this.props.user.description}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column style={columnTwo} width={12}>
              <Header size='large'> {this.props.user.firstName} {this.props.user.lastName} </Header>
              <Link to={`/editprofile/${this.props.user._id}`}>Edit Profile</Link>
              <Header size='medium'><Icon name='arrow circle outline up'/> Listings </Header>
              <Table basic selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell> Item </Table.HeaderCell>
                    <Table.HeaderCell> Category </Table.HeaderCell>
                    <Table.HeaderCell> Condition </Table.HeaderCell>
                    <Table.HeaderCell> Price </Table.HeaderCell>
                    <Table.HeaderCell> Actions </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff}/>)}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Container>

    );
  }
}

/** Require a document to be passed to this component. */
User.propTypes = {
  user: PropTypes.object.isRequired,
  stuffs: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(withTracker(() => {
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(User));
