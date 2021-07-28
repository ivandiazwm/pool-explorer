import React from 'react';
import Topbar from './components/Topbar';
import PoolSearcher from './components/PoolSearcher';
import Agents from './components/Agents';
import './App.css';

function App() {
  return (
    <div className="App">
      <Topbar />
      <PoolSearcher />
      <Agents />
    </div>
  );
}

export default App;
