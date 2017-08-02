import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { ESTIMATE_FORM } from '../../constants';
import { calculateAtFirstTime } from '../../actions/Calculation';
import Loading from '../../components/libs/Loading';
import {
  estimateFormValues,
  estimateGeneralInfo,
} from '../../data/queriesClient';
import changeGeneralEstimateInfo from '../../actions/estimate';


class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    estimateFormValues: PropTypes.object.isRequired,
    estimateGeneralInfo: PropTypes.object.isRequired,
  };

  static defaultProps = {
    id: null,
  };

  constructor(props) {
    super(props);

    this.getEstimate = this.getEstimate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const oldEstimate = this.props.estimateFormValues.estimate;
    const { loading, estimate } = nextProps.estimateFormValues;
    const { estimate: generalInfo } = nextProps.estimateGeneralInfo;

    if (!loading && JSON.stringify(estimate) !== JSON.stringify(oldEstimate)) {
      this.getEstimate(estimate);
      this.props.dispatch(changeGeneralEstimateInfo(generalInfo))
    }
  }

  getEstimate(estimate) {
    const { dispatch } = this.props;

    dispatch({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: ESTIMATE_FORM,
        keepDirty: false,
      },
      payload: estimate,
    });
    dispatch(calculateAtFirstTime(ESTIMATE_FORM));
  }

  render() {
    const {
      estimateGeneralInfo: { loading: loadingGeneralInfo },
      estimateFormValues: { loading: loadingFormValue },
    } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        {
          loadingGeneralInfo || loadingFormValue
          ? <Loading />
          : <div>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

export default compose(
  connect(),
  graphql(estimateFormValues, {
    options: props => ({
      variables: {
        id: props.id,
      },
    }),
    name: 'estimateFormValues',
  }),
  graphql(estimateGeneralInfo, {
    options: props => ({
      variables: {
        id: props.id,
      },
    }),
    name: 'estimateGeneralInfo',
  }),
)(Wrapper);
