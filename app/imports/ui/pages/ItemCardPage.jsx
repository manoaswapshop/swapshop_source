/* eslint-disable max-len */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader, Card, Image } from 'semantic-ui-react';
import { Stuffs, StuffSchema } from '/imports/api/stuff/stuff';
import AutoForm from 'uniforms-semantic/AutoForm';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Users } from '/imports/api/user/user';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemCardPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    const menuStyle = { marginTop: '10px' };
    return (
        <div className='background-image'>
          <Grid container centered>
            <Grid.Column>
              <AutoForm schema={ StuffSchema } model={this.props.stuff}>
                <Header as="h2" textAlign="center" inverted>{this.props.stuff.name}</Header>
                <Card centered>
                  <Card.Content>
                    <Image fluid src={this.props.stuff.image}/>
                    <Card.Header style={menuStyle}>
                      ${this.props.stuff.price}
                    </Card.Header>
                    <Card.Meta>
                      Category: {this.props.stuff.category}
                      <br />Condition: {this.props.stuff.condition}
                    </Card.Meta>
                    <Card.Description>
                      Description: <br />{this.props.stuff.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                      Owner: {this.props.stuff.owner}
                    <br />Location: {this.props.stuff.location}
                  </Card.Content>

                </Card>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ItemCardPage.propTypes = {
  stuff: PropTypes.array,
  user: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('AllStuff');
  const subscription2 = Meteor.subscribe('AllUsers');
  return {
    stuff: Stuffs.findOne(documentId),
    user: Users.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ItemCardPage);
