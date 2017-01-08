import React, { PropTypes } from 'react';
import { Button, Header, Table } from 'semantic-ui-react'
import moment from 'moment';

import Asset from '../../components/stellar/Asset';
import AccountId from '../../components/stellar/AccountId';
import AmountComponent from '../../components/stellar/Amount';

class Payments extends React.Component {

  getDate(transaction) {
    const mo = moment(transaction.created_at);
    return mo.calendar();
  }

  openTransaction(transaction) {
    return e => {
      e.preventDefault();
      const id = transaction.id;
      const url = `http://testnet.stellarchain.io/tx/${id}`;
      window.open(url);
    }
  }
  getPaymentRow(payment, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell>
          <AccountId myAccountId={this.props.account.account_id} accountId={payment.from} />
        </Table.Cell>
        <Table.Cell>
          <AccountId myAccountId={this.props.account.account_id} accountId={payment.to} />
        </Table.Cell>
        <Table.Cell>
          <AmountComponent accountId={this.props.account.account_id} payment={payment} />
        </Table.Cell>
        <Table.Cell>
          <Asset {...payment} />
        </Table.Cell>
        <Table.Cell>
          {this.getDate(payment.transaction)}
        </Table.Cell>
        <Table.Cell>
          <Button
            circular
            basic
            compact
            icon="external"
            onClick={this.openTransaction(payment.transaction)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  getPathPaymentRow(payment, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell>
          <AccountId myAccountId={this.props.account.account_id} accountId={payment.from} />
        </Table.Cell>
        <Table.Cell>
          <AccountId myAccountId={this.props.account.account_id} accountId={payment.to} />
        </Table.Cell>
        <Table.Cell>
          <AmountComponent account={this.props.account} payment={payment} />
        </Table.Cell>
        <Table.Cell>
          <Asset
            asset_type={payment.source_asset_type}
            asset_issuer={payment.source_asset_issuer}
            asset_code={payment.source_asset_code} />
        </Table.Cell>
        <Table.Cell>
          <Asset {...payment} />
        </Table.Cell>
        <Table.Cell>
          {this.getDate(payment.transaction)}
        </Table.Cell>
        <Table.Cell>
          <Button
            circular
            basic
            compact
            icon="external"
            onClick={this.openTransaction(payment.transaction)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { payments } = this.props;
    return (
      <div>
        <Header as="h2">Payments</Header>
        <Table singleLine size="small" compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Open</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {payments.filter(p => (p.type === 'payment')).map(::this.getPaymentRow)}
          </Table.Body>
        </Table>

        <Header as="h3">Path payments</Header>
        <Table singleLine size="small" compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>From account</Table.HeaderCell>
              <Table.HeaderCell>To account</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>From asset</Table.HeaderCell>
              <Table.HeaderCell>To asset</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Open</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {payments.filter(p => (p.type === 'path_payment')).map(::this.getPathPaymentRow)}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

Payments.propTypes = {
  account: PropTypes.object,
  payments: PropTypes.array,
};

export default Payments;
