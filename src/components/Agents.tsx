import React from 'react';
import { Label, Header, Table, Loader, Message } from 'semantic-ui-react';
import { useAppSelector } from '../app/hooks';
import './Agents.css';

function Agent({loading, id, name, reference, version, fromAddress, date}) {
  if (loading) {
    return (
      <Table.Row>
        <Table.Cell colSpan="4">
          <Loader active inline />
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table.Row className="Agent">
      <Table.Cell className="Agent__name">
        {name}<span> </span>
        <a
          target="_blank"
          href={`https://ipfs.infura.io/ipfs/${reference}`}>
        ({id})
        </a>
      </Table.Cell>
      <Table.Cell><Label color="violet">{version}</Label></Table.Cell>
      <Table.Cell>
        <a
          target="_blank"
          href={`https://goerli.etherscan.io/address/${fromAddress}`}>
        {fromAddress}
        </a>
      </Table.Cell>
      <Table.Cell>{date}</Table.Cell>
    </Table.Row>
  );
}

function Agents() {
  const poolId = useAppSelector(state => state.app.pool.id);
  const poolLoading = useAppSelector(state => state.app.pool.loading);
  const poolError = useAppSelector(state => state.app.pool.error);
  const agents = useAppSelector(state => state.app.agents);

  if(poolError) {
    return (
      <div className="Agents__container">
        <Message negative>
          {poolError}
        </Message>
      </div>
    );
  }

  if (poolLoading) {
    return (
      <div className="Agents__container">
        <Loader active inline />
      </div>
    );
  }

  if (!poolId) {
    return null;
  }

  return (
    <div className="Agents__container">
      <Header as="h2">
        Agents for
        <span className="Agents__poolId">
          {poolId}
        </span>
      </Header>
      <Table striped>
        <Table.Header>
          <Table.HeaderCell>AgentId</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {agents.map((agent, index) => <Agent key={`${index}-${agent.id}`} {...agent}/>)}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Agents;