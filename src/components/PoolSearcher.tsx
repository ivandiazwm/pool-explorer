import React, { useState } from 'react';
import { Button, Icon, Label, Search } from 'semantic-ui-react';
import './PoolSearcher.css';

function PoolSearcher() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  return (
    <div className="PoolSearcher">
      <Search
        className="PoolSearcher__input"
        placeholder="Enter pool id..."
        size="huge"
        loading={loading}
        onResultSelect={() => {}}
        onSearchChange={(e, {value}) => {
          setValue(value)
        }}
        results={results}
        value={value}
      />
    </div>
  );
}

export default PoolSearcher;