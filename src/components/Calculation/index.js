import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBlock, Col } from 'reactstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';
import PieChart from '../PieChart';
import EstimateOptions from '../EstimateOptions';

const Calculation = ({
  rate,
  totalHours,
  onRateChange,
  estimateOptions,
  addEstimateOptions,
}) => (
  <Card className={styles.calculation}>
    <CardBlock className={styles.calculation__wrapper}>
      <Col
        xs="12" lg="4"
        className={styles.calculation__piechart}
      >
        {
          //TODO fix issue
          <PieChart data={estimateOptions} />
        }
      </Col>
      <Col
        xs="12" lg="8"
        className={styles.calculation__options}
      >
        <EstimateOptions
          rate={rate}
          totalHours={totalHours}
          onRateChange={onRateChange}
          estimateOptions={estimateOptions}
          addEstimateOptions={addEstimateOptions}
        />
      </Col>
    </CardBlock>
  </Card>
);

Calculation.propTypes = {
  rate: PropTypes.number.isRequired,
  totalHours: PropTypes.number.isRequired,
  onRateChange: PropTypes.func.isRequired,
  estimateOptions: PropTypes.object.isRequired,
  addEstimateOptions: PropTypes.func.isRequired,
};

export default withStyles(styles)(Calculation);