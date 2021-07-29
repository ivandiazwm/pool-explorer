import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Label, Loader, Search } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPool, loadPoolIds } from '../slices/appSlice';
import './PoolSearcher.css';

function PoolSearcher() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [opened, setOpened] = useState(false);
  const pools = useAppSelector(state => state.app.suggestedPools);
  const loading = useAppSelector(state => state.app.suggestedPoolsLoading);
  const contractAddress = useAppSelector(state => state.app.environment.contractAddress);

  useEffect(function () {
    dispatch(loadPoolIds(contractAddress));
  }, [contractAddress]);

  let results = !loading ?
    pools.filter(pool => pool.startsWith(value)).map(pool => ({value: pool})) :
    [{value: <div>Loading pools... <Loader active inline /></div>}];

  return (
    <div className="PoolSearcher" data-loading={loading}>
      <Search
        className="PoolSearcher__input"
        size="huge"
        fluid
        loading={loading}
        placeholder="Enter pool id..."
        onSearchChange={(_, {value}) => setValue(value)}
        onResultSelect={(e, data) => {
          dispatch(loadPool(data.result.value));
          setOpened(false)
        }}
        onBlur={() => setOpened(false)}
        onFocus={() => setOpened(true)}
        open={opened}
        resultRenderer={({ value }) => <div key={value}>{value}</div>}
        results={results}
        value={value} />
    </div>
  );
}

export default PoolSearcher;