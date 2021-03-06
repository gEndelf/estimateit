import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBlock,
} from 'reactstrap';


import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as styles from './styles.scss';

const FinalEstimate = ({ totalHours, moneyRate }) => {
  const totalSum = Math.round(totalHours * moneyRate);

  return (
    <Card className={styles.final}>
      <CardBlock className={styles.final__wrapper}>
        <div className={styles.final__result}>
          <div className={styles.final__result_info}>
            Total hours: {totalHours || '0h'}
          </div>
        </div>
        <div className={styles.final__result}>
          <div className={styles.final__result_info}>
            Total sum: {totalSum}$
          </div>
        </div>
      </CardBlock>
    </Card>
  );
};

FinalEstimate.propTypes = {
  moneyRate: PropTypes.string.isRequired,
  totalHours: PropTypes.number.isRequired,
};

export default withStyles(styles)(FinalEstimate);
