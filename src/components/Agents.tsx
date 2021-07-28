import React from 'react';
import { Button, Label, Header, Table } from 'semantic-ui-react';
import './Agents.css';

function Agent() {
  return (
    <Table.Row className="Agent">
      <Table.Cell className="Agent__name">
        agent1<span> </span>
        <a
          target="_blank"
          href="https://ipfs.infura.io/ipfs/Qmcaj6goBFfqU3vrWsowKTHmWRCTjP7wahsdb1YW6pV5Yb">
        (0x1bccd1c56bdc239ee16547d38360d9b7629fa6d0aecdeaa76e0e19c1a0ae9704)
        </a>
      </Table.Cell>
      <Table.Cell><Label color="violet">0.0.2</Label></Table.Cell>
      <Table.Cell>
        <a
          target="_blank"
          href="https://goerli.etherscan.io/address/0x5d8543faa52157de5eaeeb4b209ef09dbd47cad3">
        0x5d8543faa52157de5eaeeb4b209ef09dbd47cad3
        </a>
      </Table.Cell>
      <Table.Cell>Mon, 26 Jul 2021</Table.Cell>
    </Table.Row>
  );
}

function Agents() {
  return (
    <div className="Agents__container">
      <Header as="h2">
        Agents for
        <span className="Agents__poolId">
          0x9d3d1df113ae5f4ff7fb542439229d50a384f4c2162c4fe4e298beefc872ddf2 (agent-devnet)
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
          <Agent />
          <Agent />
          <Agent />
          <Agent />
        </Table.Body>
      </Table>
      <Button>Load more</Button>
    </div>
  );
}

export default Agents;