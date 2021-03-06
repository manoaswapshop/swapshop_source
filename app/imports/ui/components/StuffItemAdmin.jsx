import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Stuffs } from '/imports/api/stuff/stuff';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItemAdmin extends React.Component {

  /** Bind 'this' so that we can access this.props in onClick. */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  /* When the delete button is clicked, remove the corresponding item from the collection. */
  onClick() {
    /* eslint-disable-next-line */
    var r = confirm('Do you really want to delete this listing?');
    if (r === true) {
      Stuffs.remove(this.props.stuff._id, this.deleteCallback);
    }
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.category}</Table.Cell>
          <Table.Cell>{this.props.stuff.condition}</Table.Cell>
          <Table.Cell>{this.props.stuff.price}</Table.Cell>
          <Table.Cell>{this.props.stuff.location}</Table.Cell>
          <Table.Cell>
            <Button basic onClick={this.onClick}>Delete</Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItemAdmin);
