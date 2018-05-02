import React from 'react';
import { Container, Grid, Header, Icon, List } from 'semantic-ui-react';

export default class Help extends React.Component {
  render() {
    const divStyle = { paddingTop: '20px', paddingBottom: '20px' };
    return (
        <div className='background-image'>
          <Grid style={divStyle} container stackable centered columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='plus square outline' inverted/>
              <Header as='h1' inverted>Creating a Listing</Header>
              <List ordered inverted>
                <List.Item>Start by signing into your account</List.Item>
                <List.Item>Click on &#39;List An Item&#39; on the Nav Bar</List.Item>
                <List.Item>Provide details for your item and click &#39;Submit&#39;</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='handshake outline' inverted/>
              <Header as='h1' inverted>Accepting a listing</Header>
              <List ordered inverted>
                <List.Item>Click on &#39;Listed Items&#39;</List.Item>
                <List.Item>Select the item you wish to purchase</List.Item>
                <List.Item>Look through the information and email the owner of the item if you have any
                  questions</List.Item>
                <List.Item>(FOR OWNERS ONLY) Please delete your listing on your profile if the transaction is
                  successful. If any issues
                  arise and cannot be resolved, please email us at themanoaswapshop@gmail.com</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='question circle' inverted/>
              <Header as='h1' inverted>Other Questions</Header>
              <Header as='h3' inverted>For any other issues, please email our admins at
                themanoaswapshop@gmail.com</Header>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}

