import './App.css';
import React, { useState } from 'react';
import useDidMountEffect from './components/CustomHook';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {
  const [paNum, setPaNum] = useState(0);
  const [button, setButton] = useState(0);
  const [updateCalled, setUpdateCalled] = useState(0);

  const updateURL = (e) => {
    e.preventDefault();
    setPaNum(e.target.number.value)
    setUpdateCalled(updateCalled + 1);
  }

  useDidMountEffect(() => {
    if (button === 1) {
      axios.get(`https://b0t.mypinata.cloud/ipfs/QmdRAvWJa2Ck3pQPVni1DhYHc1zZNvJnZWAacS3vfWuDYA/${paNum}`)
        .then((e) => {
          const ipfsHash = e.data.image.replace('ipfs://', '');
          window.open(`https://b0t.mypinata.cloud/ipfs/${ipfsHash}`, "_blank")
        })
    } else if (button === 2) {
      axios.get(`https://b0t.mypinata.cloud/ipfs/QmdRAvWJa2Ck3pQPVni1DhYHc1zZNvJnZWAacS3vfWuDYA/${paNum}`)
        .then((e) => {
          const ipfsHash = e.data.image.replace('ipfs://', '');
          saveAs(`https://b0t.mypinata.cloud/ipfs/${ipfsHash}`, `PA${paNum}.jpg`);
        })
    }
  }, [paNum, button, updateCalled]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', backgroundColor: '#000000' }} className="App">
      <h1 style={{ color: '#FFFFFF', fontWeight: 900 }}>PA Genesis Downloader</h1>
      <form onSubmit={updateURL}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <input type="text" name="number" placeholder="PA Token #" style={{ width: '300px', fontSize: '16px', textAlign: 'center' }} />
          <div style={{ display: 'flex' }}>
            <button onClick={() => (setButton(1))} style={{ cursor: 'pointer', marginTop: '24px', backgroundColor: '#FFFD54', borderRadius: '24px', border: 'none', width: '150px', height: '40px', color: 'black', fontWeight: 'bold', fontSize: '16px', marginRight: '12px' }}>Open Image</button>
            <button onClick={() => (setButton(2))} style={{ cursor: 'pointer', marginTop: '24px', backgroundColor: '#486cfc', borderRadius: '24px', border: 'none', width: '150px', height: '40px', color: 'black', fontWeight: 'bold', fontSize: '16px', marginLeft: '12px' }}>Download Image</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
