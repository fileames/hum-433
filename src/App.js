import './App.css';
import Map from './components/Map';

import React, { useRef, useEffect, useState } from 'react';

function App() {

  const [num_participants, setNumParticipantsData] = useState([]);

  const handleParticipantsChange = (evnt)=>{
    setNumParticipantsData(evnt.target.value)
  }

  return (
    <div className="App">
      <div class="container">
        <div class="row mt-4 mb-4">
          <h4 className='display-4'>Academic Network Sustainability Network</h4>
        </div>
          <div class="row">
            <div class="col-sm-8" height="100%">
              <Map num_participants={num_participants}></Map>
              <div className="mt-5 mb-5"></div>
              <div className="mt-5 mb-5"></div>
            </div>
            <div class="col-sm-4">
              <label for="number_participants" class="form-label">Number of Participants</label>
              <input type="range" class="form-range" min="1" max="3" step="1" id="number_participants" onChange={handleParticipantsChange}></input>
            </div>
            
          </div>
        </div>
    </div>
  );
}

export default App;
