import React from 'react';
import { Header } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class About extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <div style={divStyle} className="ui center aligned container">
          <Header>
          The Swap Shop is an application that will help to facilitate safe purchase of goods and services among UHM
          students and faculty.
          </Header>
        </div>
    );
  }
}

