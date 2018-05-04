import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Users } from '/imports/api/user/user';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserTable extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell><Link to={`/userprofile/${this.props.user._id}`}>{this.props.user.firstName}</Link></Table.Cell>
          <Table.Cell>{this.props.user.lastName}</Table.Cell>
          <Table.Cell>{this.props.user.userEmail}</Table.Cell>
          <Table.Cell>{this.props.user.userNumber}</Table.Cell>
          <Table.Cell>{this.props.user.uhNumber}</Table.Cell>
          <Table.Cell>{this.props.user.description}</Table.Cell>
          <Table.Cell>{this.props.user.owner}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
UserTable.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserTable);
