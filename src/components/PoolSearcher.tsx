import React, { useState } from 'react';
import { Button, Icon, Label, Search } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPool } from '../slices/appSlice';
import './PoolSearcher.css';

function PoolSearcher() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state);
  console.log('state', state);

  return (
    <div className="PoolSearcher">
      <Search
        className="PoolSearcher__input"
        placeholder="Enter pool id..."
        size="huge"
        loading={loading}
        onResultSelect={() => {
          console.log('wea')
        }}
        onSearchChange={(e, {value}) => {
          setValue(value)
        }}
        onBlur={() => {
          console.log('calling');
          dispatch(loadPool(value));
        }}
        results={results}
        value={value}
      />
    </div>
  );
}

export default PoolSearcher;