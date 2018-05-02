import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { padding: '15px', color: 'white' };
    return (
        <footer>
          <div style={divStyle} className="uh-background">
              <Grid centered textAlign="left" columns={3}>
                <Grid.Column>
                  Categories
                  <hr />
                  <List link inverted>
                    <List.Item as={NavLink} exact to="/clothing">-Clothing</List.Item>
                    <List.Item as={NavLink} exact to="/textbooks">-Textbooks</List.Item>
                    <List.Item as={NavLink} exact to="/electronics">-Electronics</List.Item>
                    <List.Item as={NavLink} exact to="/furniture">-Furniture</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  Popular Items
                  <hr />
                  <List>
                    <List.Item>-Lorem Ipsum</List.Item>
                    <List.Item>-Lorem Ipsum</List.Item>
                    <List.Item>-Lorem Ipsum</List.Item>
                    <List.Item>-Lorem Ipsum</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  Contact Us
                  <hr />
                  <List link inverted>
                    <List.Item>themanoaswapshop@gmail.com</List.Item>
                    <List.Item>Phone: 808-867-5309</List.Item>
                    <List.Item as={NavLink} exact to="/help">Help</List.Item>
                  </List>
                </Grid.Column>
              </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
