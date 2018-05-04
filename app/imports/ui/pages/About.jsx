import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class About extends React.Component {
  render() {
    const divStyle = { paddingTop: '20px', paddingBottom: '20px' };
    return (
        <div className='background-image'>
          <Grid style={divStyle} container stackable centered columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='browser' inverted/>
              <Header as='h1' inverted>List of Items</Header>
              <Header as='h3' inverted>All of the available items being offered will be presented in a simple list that
                will display helpful information about each product. Each item will have a clickable link that will lead
                to an Item Card Page with additional information. Links at the bottom of the app lead to specific
                category pages that help users to find exactly what they want.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='id card outline' inverted/>
              <Header as='h1' inverted>User Profiles</Header>
              <Header as='h3' inverted>Every user will be given a profile that is viewable to other users. These
                profiles can contain contact information, current available items, reputation, and messaging
                features. Items that are currently available for purchase will be linked to their corresponding
                seller&#39;s
                profile.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='location arrow' inverted/>
              <Header as='h1' inverted>Product Exchange</Header>
              <Header as='h3' inverted>When a user buys an item, communication between the buyer and seller will be
                established through contact information provided in each users&#39; profile. The Manoa Swap Shop will
                provide a list of safe locations on UH Manoa campus that both parties can
                agree to meet at to exchange money and goods.</Header>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}

