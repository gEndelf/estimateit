import React from 'react';
import PropTypes from 'prop-types';
import normalizeCss from 'normalize.css';
import { Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Col, Card } from 'reactstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.scss';

import { ESTIMATE_FORM } from '../../constants';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  getChildContext() {
    const { handleSubmit } = this.props;
    return { handleSubmit };
  }

  render() {
    return (
      <Container className={s.estimator}>
        <Card id="screen">
          <Col xs="12" md="12" lg="10" className={s.estimator__container}>
            <Form
              form="contact"
            >
              {this.props.children}
            </Form>
          </Col>
        </Card>
      </Container>
    );
  }
}

Layout.childContextTypes = {
  handleSubmit: PropTypes.func,
};

Layout = reduxForm({
  form: ESTIMATE_FORM,
  enableReinitialize: true
})(Layout);

const initializeValues = (state) => {

  const initialValues = {
    moneyRate: '25',
    estimateOptions: {
      qa: 10,
      pm: 10,
      risks: 10,
      bugFixes: 10,
      completing: 100,
    },
  };

  return { initialValues };
};

export default connect(initializeValues)(withStyles(normalizeCss, s)(Layout));
