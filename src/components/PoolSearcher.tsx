import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Label, Loader, Search } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPool, loadPoolIds } from '../slices/appSlice';
import './PoolSearcher.css';

function PoolSearcher() {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [opened, setOpened] = useState(false);
  const pools = useAppSelector(state => state.app.suggestedPools);
  const loading = useAppSelector(state => state.app.suggestedPoolsLoading);
  const contractAddress = useAppSelector(state => state.app.environment.contractAddress);

  useEffect(function () {
    dispatch(loadPoolIds(contractAddress));
  }, [contractAddress]);

  let results = !loading ?
    pools.filter(pool => pool.startsWith(inputValue)).map(pool => ({value: pool})) :
    [{value: <div>Loading pools... <Loader active inline /></div>}];

  const searchPool = (value) => {
    dispatch(loadPool(value));
    setInputValue(value);
    setOpened(false);
  };

  return (
    <div className="PoolSearcher" data-loading={loading}>
      <Search
        className="PoolSearcher__input"
        size="huge"
        fluid
        loading={loading}
        placeholder="Enter pool id..."
        onSearchChange={(_, {value}) => setInputValue(value)}
        onResultSelect={(e, data) => searchPool(data.result.value)}
        onBlur={() => setOpened(false)}
        onFocus={() => setOpened(true)}
        open={opened}
        resultRenderer={({ value }) => <div key={value}>{value}</div>}
        results={results}
        value={inputValue} />
      <Button content='Search' size="small" style={{marginLeft: 10}} onClick={() => searchPool(inputValue)}/>
    </div>
  );
}

export default PoolSearcher;