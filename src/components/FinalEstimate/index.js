import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import {
  Card,
  CardBlock,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
} from 'reactstrap';
import axios from 'axios';
import Notification from 'react-notification-system';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import columns from '../../constants/csvCoulumns';
import csvGenerate from './lib/csvGenerate';
import csvFilename from './lib/csvFilename';
import styles from './styles.scss';


class FinalEstimate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      axios: [],
      dropdownOpen: false,
      csv: '',
    };
    this.saveAsUrl = this.saveAsUrl.bind(this);
    this.saveAsPdf = this.saveAsPdf.bind(this);
    this.saveAsCSV = this.saveAsCSV.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  copyUrlToClipboard(url) {
    this.customNotificationInput.value = url.trim();
    this.customNotificationInput.select();
    document.execCommand('copy');
  }

  toggle() {
    const dropdownOpen = !this.state.dropdownOpen;
    this.setState({ dropdownOpen });
  }

  saveAsUrl() {
    const { mainState: main, headerState: header, mutate } = this.props;

    mutate({
      variables: { input: { header, main } },
    }).then(({ data: { estimateCreate: { url } } }) => {
      this.notificationSystem.addNotification({
        title: 'Success',
        position: 'br',
        level: 'success',
        children: (
          <div>
            <input
              type="text"
              value={url}
              onClick={e => e.stopPropagation()}
              className={styles['custom-notification-input']}
              ref={node => (this.customNotificationInput = node)}
            />
            <button
              type="button"
              onClick={this.copyUrlToClipboard.bind(this, url)}
              className={styles['custom-notification-action-button']}
            >
            Copy to clipboard
          </button>
          </div>
        ),
      });
    }).catch(error => {
      this.notificationSystem.addNotification({
        title: 'Error',
        level: 'error',
        position: 'br',
        autoDismiss: 6,
        message: 'internal server error',
      });
    });
  }

  async saveAsPdf() {
    axios.post('/api/pdf', {
      url: decodeURIComponent(location.href),
    }, { responseType: 'arraybuffer' })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(file);
        link.download = 'keenethics_report.pdf';
        link.click();
        this.notificationSystem.addNotification({
          title: 'Success',
          message: 'generation of the PDF was successful!',
          level: 'success',
          autoDismiss: 6,
          position: 'br',
        });
      })
      .catch((error) => {
        console.error(error);
        this.notificationSystem.addNotification({
          title: 'Error',
          level: 'error',
          position: 'br',
          autoDismiss: 6,
          message: 'internal server error',
        });
      });
  }

  saveAsCSV() {
    const {
      headerState: { tasks },
      mainState: { estimateOptions },
    } = this.props;

    this.setState({
      csv: csvGenerate(columns, tasks, estimateOptions),
    }, () => {
      console.log('csv', this.state.csv);
      const a = document.createElement('a');
      a.textContent = 'download';
      a.download = csvFilename();
      a.href = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURIComponent(this.state.csv)}`;
      a.click();
    });
  }

  render() {
    const { handleSubmit } = this.context;
    const { totalHours, mainState: { moneyRate } } = this.props;
    const totalSum = totalHours * moneyRate;

    return (
      <Card className={styles.final}>
        <CardBlock className={styles.final__wrapper}>
          <div className={styles.final__result}>
            <div className={styles.final__result_info}>Total hours: {totalHours}</div>
          </div>
          <div className={styles.final__result}>
            <div className={styles.final__result_info}>
              Total sum: {totalSum}$
            </div>
          </div>
          <ButtonDropdown
            id="screenShot"
            toggle={this.toggle}
            className={styles.final__result}
            isOpen={this.state.dropdownOpen}
          >
            <DropdownToggle
              caret
              color="danger"
              className={styles.final__result_info}
            >
              Report
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Type</DropdownItem>
              <DropdownItem
                type="submit"
                onClick={handleSubmit(this.saveAsPdf)}
              >
                Generate PDF
              </DropdownItem>
              <DropdownItem
                type="submit"
                onClick={handleSubmit(this.saveAsCSV)}
              >
                Generate CSV
              </DropdownItem>
              <DropdownItem
                type="submit"
                onClick={handleSubmit(this.saveAsUrl)}
              >
                Generate URL
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </CardBlock>
        <Notification ref={ref => this.notificationSystem = ref} />
      </Card>
    );
  }
}

FinalEstimate.contextTypes = {
  handleSubmit: PropTypes.func,
};

FinalEstimate.propTypes = {
  mutate: PropTypes.func.isRequired,
  mainState: PropTypes.object.isRequired,
  totalHours: PropTypes.number.isRequired,
  headerState: PropTypes.object.isRequired,
};

export default compose(
  graphql(gql`
    mutation EstimateMutation (
      $input: EstimateInputType!
    ) {
      estimateCreate (
        input: $input
      ) {
        url
      }
    },
  `),
  withStyles(styles),
)(FinalEstimate);