import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBlock, CardHeader, Input } from 'reactstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Field } from 'redux-form';
import { renderField } from '../libs/helpers.js';
import { required, email, alphaNumeric } from '../libs/validation.js';

import styles from './styles.scss';


class Contacts extends Component {
  constructor(props) {
    super(props);
    this.onContactsChange = this.onContactsChange.bind(this);
  }

  onContactsChange({ currentTarget: { name, value } }) {
    this.props.addClientData(name, value);
  }

  render() {
    return (
      <Card className={styles.contacts}>
        <CardHeader>If you have any questions about this estimate, please contact</CardHeader>
        <CardBlock>
          <Field
            name="pm"
            type="text"
            label="PM's name"
            validate={[required]}
            component={renderField}
            className={styles.contacts__input}
          />
          <Field
            type="text"
            name="position"
            label="Position"
            validate={[required]}
            component={renderField}
            className={styles.contacts__input}
          />
          <Field
            type="email"
            name="email"
            label="Email"
            validate={[required, email]}
            component={renderField}
            className={styles.contacts__input}
          />
          <Field
            type="text"
            name="skype"
            label="Skype"
            validate={[required, alphaNumeric]}
            component={renderField}
            className={styles.contacts__input}
          />
        </CardBlock>
      </Card>
    );
  }

}

Contacts.propTypes = {
  addClientData: PropTypes.func.isRequired,
};

export default withStyles(styles)(Contacts);
