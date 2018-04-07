import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
          <div className="footer">
          <Grid container columns="three">
            <Grid.Column>
             Categories
              <hr/>
              <List>
                <List.Item>Clothing</List.Item>
                <List.Item>Textbooks</List.Item>
                <List.Item>Electronics</List.Item>
                <List.Item>Furniture</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              Popular Items
              <hr/>
              <List>
                <List.Item>Lorem Ipsum</List.Item>
                <List.Item>Lorem Ipsum</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              Contact Us
              <hr/>
              <List>
                <List.Item>admin@email.com</List.Item>
                <List.Item>808-867-5309</List.Item>
                <List.Item>Help</List.Item>
                <List.Item>FAQ</List.Item>
              </List>
            </Grid.Column>
          </Grid>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822
          </div>
          </div>
    );
  }
}

export default Footer;
