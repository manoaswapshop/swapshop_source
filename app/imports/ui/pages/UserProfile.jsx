import React from 'react';
import { Container, Grid, Image, Header, Icon, List, Table } from 'semantic-ui-react';

export default class Signout extends React.Component {
  render() {
    const columnTwo = { paddingLeft: '50px' };
    const containerStyle = { paddingTop: '50px', paddingBottom: '50px' };
    return (
        <Container style={containerStyle}>
          <Grid columns={2}>
            <Grid.Column width={4}>
              <Image src='/images/peacock2016.jpg' circular/>
              <hr/>
              <Grid.Row>
                <Header size='medium'> Contact Information </Header>
              </Grid.Row>
              <Grid.Row>
                <Icon name='envelope'/> misterpeacockhawaii@gmail.com
              </Grid.Row>
              <Grid.Row>
                <Icon name='phone'/> 808-555-5555
              </Grid.Row>
            </Grid.Column>
            <Grid.Column style={columnTwo} width={12}>
              <Header size='large'> Mister Peacock </Header>
              <Header size='medium'> Reputation </Header>
              <Grid.Row>
                4.5
                <Icon name='star'/>
                <Icon name='star'/>
                <Icon name='star'/>
                <Icon name='star'/>
                <Icon name='star half full'/>
              </Grid.Row>

              <Header size='medium'><Icon name='arrow circle outline up'/> Listings </Header>
              <Table basic selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell> Item </Table.HeaderCell>
                    <Table.HeaderCell> Category </Table.HeaderCell>
                    <Table.HeaderCell> Price </Table.HeaderCell>
                    <Table.HeaderCell> Condition </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>IKEA Couch</Table.Cell>
                    <Table.Cell>Furniture</Table.Cell>
                    <Table.Cell>$250</Table.Cell>
                    <Table.Cell>Used</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
