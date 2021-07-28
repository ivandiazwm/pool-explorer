import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import './Topbar.css';

function Topbar() {
  return (
    <header className="Topbar">
      <div className="Topbar__title">Pool explorer</div>
      <div className="Topbar__button-container">
      <Button as='div' labelPosition='right'>
        <Button color='red'>
          <Icon name='fork' />
          Production
        </Button>
        <Label as='a' basic color='red' pointing='left'>
          0xBD7F...969B
        </Label>
      </Button>
      </div>
    </header>
  )
}

export default Topbar;