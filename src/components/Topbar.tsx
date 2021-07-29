import React, { useState } from 'react';
import { Button, Icon, Label, Modal } from 'semantic-ui-react';

import { environments, network } from '../config';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setEnvironment } from '../slices/appSlice';
import './Topbar.css';

function EnvironmentModal() {
  const [open, setOpen] = useState(false);
  const env = useAppSelector((state: RootState) => state.app.environment);
  const dispatch = useAppDispatch();
  const envColor = (env) => env.name === 'Production' ? 'red' : 'purple';

  const EnvironmentButton = (
    <Button as="div" labelPosition='right'>
      <Button color={envColor(env)}>
        <Icon name="fork" />
        {env.name}
      </Button>
      <Label as="a" basic color={envColor(env)} pointing="left">
        {`${env.contractAddress.slice(0,6)}...${env.contractAddress.slice(-4)}`}
      </Label>
    </Button>
  );

  return (
    <Modal
      className="EnvironmentModal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={EnvironmentButton}
    >
      <Modal.Header>Select an environment in Goerli</Modal.Header>
      <Modal.Content>
        {environments.map(environment => (
          <div className="EnvironmentModal__item" key={`env-btn-${environment.name}`}>
            <Button as="div" labelPosition="right" onClick={() => {
              setOpen(false);
              dispatch(setEnvironment(environment));
            }}>
              <Button color={envColor(environment)}>
                <Icon name="fork" />
                {environment.name}
              </Button>
              <Label as="div" basic color={envColor(environment)} pointing="left">
                {environment.contractAddress}
              </Label>
            </Button>
            <Button
                icon="file"
                as="a"
                href={`${network.baseExplorerAPI}/address/${environment.contractAddress}`}
                target="_blank" />
          </div>
        ))}
      </Modal.Content>
    </Modal>
  )
}

function Topbar() {
  return (
    <header className="Topbar">
      <div className="Topbar__title">Pool explorer</div>
      <div className="Topbar__button-container">
        <EnvironmentModal />
      </div>
    </header>
  )
}

export default Topbar;