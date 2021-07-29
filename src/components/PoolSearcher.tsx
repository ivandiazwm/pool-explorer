import React, { useState } from 'react';
import { Button, Icon, Input, Label, Search } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPool } from '../slices/appSlice';
import './PoolSearcher.css';

function PoolSearcher() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const state = useAppSelector(state => state);

  return (
    <div className="PoolSearcher">
      <Input
        className="PoolSearcher__input"
        action={{
          color: 'teal',
          icon: 'search',
          labelPosition: 'right',
          content: 'Search',
          onClick: () => dispatch(loadPool(value))
        }}
        size="huge"
        list="pools"
        placeholder="Enter pool id..."
        onChange={e => setValue(e.target.value)}
        value={value} />
      <datalist id="pools">
        <option value='0x9d3d1df113ae5f4ff7fb542439229d50a384f4c2162c4fe4e298beefc872ddf2'>0x9d3d1df113ae5f4ff7fb542439229d50a384f4c2162c4fe4e298beefc872ddf2</option>
      </datalist>
    </div>
  );
}

export default PoolSearcher;