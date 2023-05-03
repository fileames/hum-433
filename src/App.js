import './App.css';
import Map from './components/Map';

import React, { useRef, useEffect, useState } from 'react';

function App() {

  const [num_participants, setNumParticipantsData] = useState([]);
  const [num_meetings, setMeetingsData] = useState([]);

  const handleParticipantsChange = (evnt) => {
    setNumParticipantsData(evnt.target.value)
  }
  const handleMeetingsChange = (evnt) => {
    setMeetingsData(evnt.target.value)
  }

  return (
    <div className="App">
      <div class="container">
        <div class="row mt-4 mb-4">
          <h4 className='display-4'>Academic Network Sustainability Network</h4>
        </div>
        <div class="row">
          <div class="col-sm-8" height="100%">
            <Map num_participants={num_participants} num_meetings={num_meetings}></Map>
            <div className="mt-5 mb-5"></div>
            <div className="mt-5 mb-5"></div>
          </div>
          <div class="col-sm-4">
            <label for="number_participants" class="form-label">Number of Participants</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="1" min="1" max="3" step="1" id="number_participants" onChange={handleParticipantsChange}></input></div>
              <div class="col-sm-2"><p>{num_participants}</p></div>

            </div>

            <label for="number_meetings" class="form-label">Number of Meetings</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="1" min="1" max="2" step="1" id="number_meetings" onChange={handleMeetingsChange}></input></div>
              <div class="col-sm-2"><p>{num_meetings}</p></div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
