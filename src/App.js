import './App.css';
import React, { useState } from 'react';
import CustomHook from './components/CustomHook';
import useDidMountEffect from './components/CustomHook';
import axios from 'axios';

function App() {
  const [paNum, setPaNum] = useState(0);
  const updateURL = (e) => {
    e.preventDefault();
    setPaNum(e.target.number.value)
  }

  useDidMountEffect(() => {
    axios.get(`https://b0t.mypinata.cloud/ipfs/QmdRAvWJa2Ck3pQPVni1DhYHc1zZNvJnZWAacS3vfWuDYA/${paNum}`)
      .then((e) => {
        const ipfsHash = e.data.image.replace('ipfs://', '');
        window.open(`https://b0t.mypinata.cloud/ipfs/${ipfsHash}`, "_blank")
      })
  }, [paNum]);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', backgroundColor: '#2E2C2D'}} className="App">
      <h1 style={{color: '#FFFD54'}}>Psychedelics Anonymous Genesis</h1>
      <form onSubmit={updateURL}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <input type="text" name="number" placeholder="PA Number" />
          <button style={{ cursor: 'pointer', marginTop: '12px', backgroundColor: '#4A6CF1', borderRadius: '24px', border: 'none', width: '100px', height: '40px', color: 'white', fontWeight: 'bold', fontSize: '16px'}}>Get Image</button>
        </div>
      </form>
    </div>
  );
}

export default App;
