import React from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const divStyle = { padding: '100px'};
    return (
        <div className='background-image'>
          <Grid style={divStyle} centered columns={2}>
            <Grid.Column width={4}>
              <Image size='medium' src="/images/UH_logo.png"/>
            </Grid.Column>
            <Grid.Column textAlign='left'>
              <Header as='h1' inverted>Reduce, Reuse, Recycle</Header><hr />
              <Header as='h3' inverted>Save money, time and our aina. Buy, Sell and Trade your old items.</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
